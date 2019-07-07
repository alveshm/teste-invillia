# teste-invillia

Tecnologias utilizadas:

NodeJS + Express

Para executar o projeto, basta fazer o clone e rodar o comando abaixo:

<pre>npm start</pre>

Dentro da basta do projeto

As rotas são as seguintes:

/tournaments

<pre>
{
	"titulo": "titulo do torneio",
	"descricao": "descricao",
	"slug": "slug-torneio"
	
}
</pre>

/rounds

<pre>
{
	"titulo": "titulo do etapa",
	"descricao": "descricao",
	"slug": "slug-torneio"
	
}
</pre>

/players

<pre>
{
	"nome": "nome jogador",
	"telefone": telefone (Number),
	"cpf": cpf (Number)
	
}
</pre>

/ranking
<pre>
{
	"torneio": "slug-torneio",
	"etapa": "titulo-etapa"
}
</pre>
