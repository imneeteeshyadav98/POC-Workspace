wget https://get.helm.sh/helm-v3.6.0-linux-amd64.tar.gz
tar xvf helm-v3.6.0-linux-amd64.tar.gz 
sudo mv linux-amd64/helm /usr/local/bin

cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://packages.cloud.google.com/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://packages.cloud.google.com/yum/doc/yum-key.gpg https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
EOF
yum install -y kubectl
wget https://github.com/vmware-tanzu/velero/releases/download/v1.5.2/velero-v1.5.2-linux-amd64.tar.gz
 tar xvf velero-v1.5.2-linux-amd64.tar.gz
cp velero-v1.5.2-linux-amd64/velero /usr/bin/

wget https://github.com/vmware-tanzu/velero/releases/download/v1.5.2/velero-v1.5.2-linux-amd64.tar.gz
tar xvf velero-v1.5.2-linux-amd64.tar.gz
cp velero-v1.5.2-linux-amd64/velero /usr/bin/

