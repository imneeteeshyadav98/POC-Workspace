kubectl create namespace webapp-react-nginx
NAMESPACE=webapp-react-nginx
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install ingress-nginx-02 ingress-nginx/ingress-nginx --create-namespace --namespace $NAMESPACE