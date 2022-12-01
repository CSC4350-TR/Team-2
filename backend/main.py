from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from sqlalchemy import Column, String, create_engine, insert
from sqlalchemy.ext.declarative import declarative_base
import sqlalchemy as db
from cryptography.fernet import Fernet

# Database setup
engine = create_engine(f'sqlite:///credentials.db')
engine.connect()
metadata = db.MetaData()
base = declarative_base()


# Creates database name, attributes, and primary key
class User_Credentials(base):
  __tablename__ = 'Credentials'
  username = Column(String, primary_key=True)
  password = Column(String)

  def __init__(self, name):
    self.name = name


base.metadata.create_all(engine)


# Uses SQL query to check if a given user is inside the database, True if they exist, else False
def check_existing_user(user: str, passwrd: str, engine=engine):
  statement = f'SELECT * FROM Credentials WHERE username = "{user}"'
  res = engine.execute(statement).fetchall()
  if res:
    return True
  return False


def add_user(user: str, passwrd: str, engine=engine):
  if check_existing_user(user, passwrd):
    return False

  # Creates fernet object to encrypt password
  key = os.environ['fernet_key']  # stored as a secret
  fernet = Fernet(key)
  encrypted = fernet.encrypt(passwrd.encode())

  statement = (  # SQL insert statement
    insert(User_Credentials).values(username=user, password=encrypted))

  engine.execute(statement)
  return True


def validate_password(user: str, passwrd: str, engine=engine):
  statement = f'SELECT * FROM Credentials WHERE username = "{user}"'
  res = engine.execute(statement).fetchall()  # should only return one user

  if not res:
    return False

  key = os.environ['fernet_key']  # stored as a secret
  fernet = Fernet(key)
  decoded = fernet.decrypt(
    res[0][1])  # stored password should always be in res[0][1]

  if decoded.decode() == passwrd:
    return True
  else:
    return False


# Init. flask
app = Flask('')
# Enable cross origin
CORS(app)


# Login API Enpoint:
@app.route('/login/', methods=('GET', 'POST'), strict_slashes=False)
def accept_password():
  print("[USER LOGIN::]")
  # Parse JSON data:
  data = request.get_json()
  print('USER INPUT:')
  print(f'\tUsername: {data["email"]}')
  print(f'\tPassword: {data["password"]}')
  # construct a string based on moves in array
  passwrd = ''.join([ele for ele in data['password']])
  # Validate user credentials:
  res = validate_password(data['email'], passwrd)
  # IF credentials are valid:
  if res:
    print('[USER VALIDATED::]')
    return jsonify(True)
  else:
    print('[USER CREDENTIALS WERE NOT VALIDATED::]')
    return jsonify(False)


# Register API Enpoint:
@app.route('/register/', methods=('GET', 'POST'), strict_slashes=False)
def register():
  print("[USER REGISTRATION::]")
  # Parse JSON data:
  data = request.get_json()
  print('USER INPUT:')
  print(f'\tUsername: {data["email"]}')
  print(f'\tPassword: {data["password"]}')
  # construct a string based on moves in array
  passwrd = ''.join([ele for ele in data['password']])
  # return False if user exists
  res = add_user(data['email'], passwrd)
  if not res:
    # print('[USER CREDENTIALS WERE AlREADY REGISTERED::]')
    return jsonify(False)
  print('[USER REGISTERED::]')
  return jsonify(True)


app.run(host='0.0.0.0', port=81)
