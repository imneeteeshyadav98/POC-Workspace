wget https://get.helm.sh/helm-v3.6.0-linux-amd64.tar.gz
tar xvf helm-v3.6.0-linux-amd64.tar.gz 
sudo mv linux-amd64/helm /usr/local/bin

curl -L https://aka.ms/InstallAzureCliDeb | sudo bash

curl -LO https://dl.k8s.io/release/v1.23.0/bin/linux/amd64/kubectl
curl -LO "https://dl.k8s.io/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256"
echo "$(<kubectl.sha256) kubectl" | sha256sum --check
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

chmod +x kubectl
mkdir -p ~/.local/bin/kubectl
mv ./kubectl ~/.local/bin/kubectl

wget https://github.com/vmware-tanzu/velero/releases/download/v1.5.2/velero-v1.5.2-linux-amd64.tar.gz
tar xvf velero-v1.5.2-linux-amd64.tar.gz
cd velero-v1.5.2-linux-amd64
sudo cp velero /usr/bin/

