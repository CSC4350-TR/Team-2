{ pkgs }: {
	deps = [
    pkgs.python39Packages.pip
    pkgs.python39Full
    pkgs.nodejs-16_x
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server
    pkgs.nodePackages.yarn
	];
}