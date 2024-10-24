**Deploy aplicação - Bem-vindo ao wiki da aplicação de exemplo do clima tempo**


1 - Pré-requisito 
* Uma conta AWS.
* Docker
* Um cluster de serviço ECS ou EKS

2 - Clone do repositório via git.

* Para clonar o repositório, crie uma pasta no seu SO e execute o comando no terminal a partir da pasta que você criou.
Copie a URL do endereço do repositório na aba code e Utilize o exemplo abaixo:
Digite: <pre><code>git clone https://github.com/gudesantana/<nome_do_repositorio>.git</code></pre>

3 - Dependências do Node.js
* Para instalação das dependências do node.js execute o comando abaixo:
<pre><code>npm install axios react react-dom react-scripts</code></pre>

4 - Criação do container
* Para criação do container da aplicação backend, execute o comando abaixo para criação do container
<pre><code>docker build -t llabs-appfrontend-v1 .</code></pre>
* O nome do container é sugerido. Esteja livre para utilizar seu padrão.

5 - Execução do container
* Execute o container na porta 3000 para testes e validação da aplicação.
<pre><code>docker run -d -p 3000:3000 --name llabs-appfrontend-v1 llabs-appfrontend-v1-v1</code></pre>

6 - Acesso ao Banco de dados
* O Banco de dados foi criado no RDS em base MySql.
* A aplicação frontend não tem acesso ao banco tendo acesso somente a aplicação backend pelas seguintes subnets internas:
<pre><code>
10.60.1.0/24
10.60.3.0/24
</code></pre>

O frontend chama o backend pelo endereço

<pre><code>
http://appback.good.tec.br:3000/atualizar-previsao
</code></pre>

Acesso a aplicação de frontend
<img width="261" alt="image" src="https://github.com/user-attachments/assets/3e5c0c9f-97fb-41cc-8e42-b43c73395cde">

Acesso a aplicação de backend
<img width="133" alt="image" src="https://github.com/user-attachments/assets/e63d59f7-a0b4-4fa5-a1b0-0cbf94ac9de3">

Caso aconteça, favor entrar em contato para redirecionarmos um novo container com nova key de acesso.

7 - Push do container para o ECR na AWS
* Efetue Primeiramente o login no container apartir da máquina que irá efetuar o push.
Execute o comando 

<pre><code>
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 816069124394.dkr.ecr.us-east-1.amazonaws.com
</code></pre>

* Crie o tag do container permitindo seu push ao repositório.
<pre><code>
docker tag llabs-appfrontend-v1 816069124394.dkr.ecr.us-east-1.amazonaws.com/ecr-llabs-appfront-prd:llabs-appfrontend-v1
</code></pre>

* Efetue o push do container no repositório ECR da AWS
<pre><code>
docker push 816069124394.dkr.ecr.us-east-1.amazonaws.com/ecr-llabs-appfront-prd:llabs-appfrontend-v1
</code></pre>

8 - Acesso à aplicação.
A aplicação backend e frontend podem ser acessada após a disponibilização do cluster de ECS é:

* Frontend
<pre><code>
clima.good.tec.br:3001 
ou
appfront.good.tec.br
ou
loadbalance do cluster ECS.
</code></pre>

* Backend
<pre><code>
clima.good.tec.br:3000 
ou
appback.good.tec.br
ou
loadbalance do cluster ECS.
</code></pre>

* Para criação de novos clusters, alterar as seguintes variáveis nos arquivos tfvars. Alterar a seguinte linha copiando os valores do URI do container no repositório respectivo no ECR.

<pre><code>
app_image = 816069124394.dkr.ecr.us-east-1.amazonaws.com/ecr-llabs-appback-prd:llabs-appfrontend-v1
</code></pre>

* Após o push do container executar os seguintes comandos no terraform

<pre><code>
Terraform workspace list
</code></pre>

<pre><code>
Terraform workspace select <workspace do projeto>
</code></pre>

<pre><code>
terraform plan -var-file="llabs-appfrontend-v1" <workspace do projeto>
</code></pre>
Valide se as alterações correspondem somente as alterações do URI do container no ECR.

<pre><code>
terraform apply -var-file="llabs-prd-appfront.tfvars" <workspace do projeto>
</code></pre>
Digite yes para aceitar as mudanças.

* Seu cluster ECS com sua aplicação já deverá estar disponível para uso.
Podendo ser validada pelo endereço clima.good.tec.br:3001

9 - Fim

Se você chegou até aqui, todos os passos foram configurados e recursos implementados corretamente.
Vamos para o próximo repositório para criação da conta HML e posteriormente a parametrização das contas de PRD e HML.

Abraço. Be Good! :)
