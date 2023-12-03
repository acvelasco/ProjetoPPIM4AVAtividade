import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const porta = 3000;
const host = '0.0.0.0';

var listaUsuarios = [];

function processarCadastroUsuario(requisicao, resposta){
    const dados = requisicao.body;
    let conteudoResposta = '';

    if(!(dados.nome && dados.sobrenome && dados.nomeusuario && dados.senha && dados.telefone && dados.endereco && dados.cidade && dados.estado && dados.cep)){

        conteudoResposta = 
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        
        </head>
        <body style="background-color: black;">
            <div class="container col-5" id="form" style=" margin-top: 50px; margin-bottom: 20px; border-radius: 20px; color: rgb(0, 113, 0);" >
              <img src="abpa.png" alt="Logotipo da ONG abpa" class="container col-40">
                <form action='/cadastrarUsuarios' method="POST"  class="row g-3 needs-validation" novalidate>
                    <fieldset class="border p-3" style="background-color: rgb(255, 251, 251); border-radius: 20px; box-shadow: 10px 10px 10px rgb(48, 48, 48);" >
                        <legend class="mb-3" style="text-align: center; font-size: 45px; font-family:Georgia, 'Times New Roman', Times, serif;color: green">Cadastro de Usuários</legend>
                    <div class="col-md-4">
                      <label for="nome" class="form-label">Nome</label>
                      <input type="text" class="form-control" id="nome" name="nome" value="${dados.nome}" required size="500" placeholder="Digite seu primeiro nome" style="border: 3px solid rgb(1, 119, 1);">
                    </div>`;

        if(!dados.nome){
            conteudoResposta += 
            `<div>
                <p class="text-danger">Por favor, informe seu nome!</p>
            </div>`;
        }

        conteudoResposta += 
        `<div class="col-md-4">
            <label for="sobrenome" class="form-label">Sobrenome</label>
            <input type="text" class="form-control" id="sobrenome" name="sobrenome" value="${dados.sobrenome}" required placeholder="Digite seu último nome" style="border: 3px solid rgb(1, 119, 1);">
        </div>`;

        if(!dados.sobrenome){
            conteudoResposta += 
            `<div>
                <p class="text-danger">Por favor, informe seu sobrenome!</p>
            </div>`;
        }

        conteudoResposta +=
        `<div class="col-md-4">
            <label for="nomeusuario" class="form-label">Nome do Usuário</label>
        <div class="input-group">
          <span class="input-group-text" id="inputGroupPrepend2">@</span>
          <input type="text" class="form-control" id="nomeusuario" name="nomeusuario" value="${dados.nomeusuario}" aria-describedby="inputGroupPrepend2" required placeholder="Digite o nome de usuário" style="border: 3px solid rgb(1, 119, 1);">
        </div>
        </div>`;

        if(!dados.nomeusuario){
            conteudoResposta += 
            `<div>
                <p class="text-danger">Por favor, informe seu nome de usuário!</p>
            </div>`;
        }

        conteudoResposta +=
        `<div class="col-md-4">
            <label for="senha" class="form-label">Senha</label>
            <input type="password" class="form-control" id="senha" name="senha" value="${dados.senha}" required style="border: 3px solid rgb(1, 119, 1);" placeholder="**********">
        <div class="invalid-feedback">Insira uma senha válida</div>
        </div>`;

        if(!dados.senha){
            conteudoResposta += 
            `<div>
                <p class="text-danger">Por favor, informe sua senha!</p>
            </div>`;
        }

        conteudoResposta +=
        `<div class="col-md-4">
            <label for="telefone" class="form-label">Telefone de Contato</label>
            <input type="tel" class="form-control" id="telefone" name="telefone" value="${dados.telefone}" title="1899999-9999" placeholder="(18) 99999-9999" required style="border: 3px solid rgb(1, 119, 1);">
         </div>`;

         if(!dados.telefone){
            conteudoResposta += 
            `<div>
                <p class="text-danger">Por favor, informe seu telefone!</p>
            </div>`;
         }

         conteudoResposta += 
         `<div class="col-md-6">
                <label for="endereço" class="form-label">Endereço</label>
                <input type="text" class="form-control" id="endereco" name="endereco" value="${dados.endereco}"required placeholder="Digite o endereço" style="border: 3px solid rgb(1, 119, 1);">
          </div>`;

          if(!dados.endereco){
            conteudoResposta += 
            `<div>
                <p class="text-danger">Por favor, informe seu telefone!</p>
            </div>`;
          }

          conteudoResposta += 
          `<div class="col-md-6">
                <label for="endereço" class="form-label">Bairro</label>
                <input type="text" class="form-control" id="bairro" name="bairro" value="${dados.bairro}" required placeholder="Digite o bairro" style="border: 3px solid rgb(1, 119, 1);">
           </div>`;

           if(!dados.bairro){
            conteudoResposta += 
            `<div>
                <p class="text-danger">Por favor, informe seu bairro!</p>
            </div>`;
           }

           conteudoResposta +=
           `<div class="col-md-6">
                <label for="cidade" class="form-label">Cidade</label>
                <input type="text" class="form-control" id="cidade" name="cidade" value="${dados.cidade}" required placeholder="Digite a cidade" style="border: 3px solid rgb(1, 119, 1);">
            </div>`;

            if(!dados.cidade){
                conteudoResposta += 
            `<div>
                <p class="text-danger">Por favor, informe sua cidade!</p>
            </div>`;
            }

            conteudoResposta += 
            `<div class="col-md-3">
                <label for="estado" class="form-label">Estado</label>
                <select class="form-select" id="estado" name="estado" value="${dados.estado}" required style="border: 3px solid rgb(1, 119, 1);">
                    <option selected disabled value="">Selecionar</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                    <option value="EX">Estrangeiro</option></option>
                </select>
            </div>`;

            if(!dados.estado){
            conteudoResposta += 
            `<div>
                <p class="text-danger">Por favor, informe seu estado!</p>
            </div>`
            }

            conteudoResposta +=
            `<div class="col-md-3">
                <label for="cep" class="form-label">CEP</label>
                <input type="text" class="form-control" id="cep" name="cep" value="${dados.cep}" required placeholder="99999-999" style="border: 3px solid rgb(1, 119, 1);">
            </div>`;

             if(!dados.cep){
            conteudoResposta += 
            `<div>
                <p class="text-danger">Por favor, informe seu CEP!</p>
            </div>`;
             }

             conteudoResposta +=
             `<div class="col-md-3">
                <label for="sexo" class="form-label">Sexo</label><br/>
                <input type="radio" id="sexo" name="sexo" value="1" checked="checked"/> Feminino<br/>
                <input type="radio" id="sexo" name="sexo" value="2" checked="checked"/> Masculino<br/>
                <input type="radio" id="sexo" name="sexo" value="3" checked="checked"/> Não me identificar<br/>
              </div>
              
              <div class="form-group">
                <label for="informacoes">Informações Adicionais:</label>
                    <textarea class="form-control" id="informacoes" rows="3" placeholder="Digite aqui..." style="border: 3px solid rgb(1, 119, 1);"></textarea>
                        </div>
                            <div class="col-12">
                                <center>
                                <button class="btn btn-primary" type="submit" style="border: 2px solid black; font-size: 20px; background-color: rgb(74, 167, 74); width: 350px; text-align: center; padding: 10px 15px;">Cadastrar</button>
                                </center>
                            </div>
                        </fieldset>
                    </form>
                </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        </body>
    </html>`; 

    resposta.end(conteudoResposta);}

    else{
        const usuario = {
            nome: dados.nome,
            sobrenome: dados.sobrenome,
            nomeusuario: dados.nomeusuario,
            senha: dados.senha,
            telefone: dados.telefone,
            endereco: dados.endereco,
            cidade: dados.cidade,
            estado: dados.estado,
            cep: dados.cep,
        }
        listaUsuarios.push(usuario);
        //retornar a lista de usuarios
        conteudoResposta = `
        
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Menu do sistema</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        </head>
        <body>
            <h1> Lista de Usuário Cadastrado</h1>
            <table class="table table-hover">
            <thead>
                <tr>
                <th scope="col">Nome</th>
                <th scope="col">Sobrenome</th>
                <th scope="col">Nome do Usuario</th>
                <th scope="col">Telefone</th>
                <th scope="col">Endereço</th>
                <th scope="col">Cidade</th>
                </tr>
            </thead>
            <tbody>`;
    
        for (const usuario of listaUsuarios){
                conteudoResposta += `
                <tr>
                    <td>${usuario.nome}</td>
                    <td>${usuario.sobrenome}</td>
                    <td>${usuario.nomeusuario}</td>
                    <td>${usuario.telefone}</td>
                    <td>${usuario.endereco}</td>
                    <td>${usuario.cidade}/${usuario.estado}</td>
                </tr>`;
            }
        conteudoResposta+= `
                </tbody>
                </table>
                <a class="btn btn-danger" href="/" role="button">Voltar ao Menu</a>
                <a class="btn btn-success" href="/cadastrarUsuarios.html" role="button">Continuar Cadastrando</a>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
            </html>`;
    
        resposta.end(conteudoResposta);
    }
    }

    function autenticar(requisicao, resposta, next){
        if(requisicao.session.usuarioAutenticado){
            next();
        }
        else{
            resposta.redirect("/login.html");
        }
    }

const app = express();
app.use(cookieParser());
app.use(session({
    secret:"M1nH4Ch4v3S3cR3t4",
    resave: false, 
    saveUninitialized: true,
    cookie: { 
        maxAge: 1000 * 60 * 15
    }
}));
app.use(express.urlencoded({ extended: true }));

//indicando para a aplicação como servir arquivos estáticos localizados na página
app.use(express.static(path.join(process.cwd(),'paginas')));


app.get('/', autenticar, (requisicao, resposta) => {
    const dataUltimoAcesso = requisicao.cookies.DataUltimoAcesso;
    const data = new Date();
    resposta.cookie("DataUltimoAcesso", data.toLocaleString(), {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true
    });
    resposta.end(`
    
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Menu do sistema</title>
    </head>
    <body>
        <h1> MENU </h1>
        <ul>
            <li><a href="/cadastrarUsuarios.html">Cadastrar Usuários</a></li>
        </ul>
    </body>
        <footer>
                <p>Seu ultimo acesso foi em ${dataUltimoAcesso}</p>
        </footer>
    </html>`)

});

app.post('/login', (requisicao, resposta)=>{
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if(usuario && senha && (usuario === 'any') && (senha === '1234')){
        requisicao.session.usuarioAutenticado = true;
        resposta.redirect('/');
    }
    else{
        resposta.end(`
            <!DOCTYPE html>
                <head>
                    <meta charset="UTF-8">
                    <title>Falha na autenticação</title>
                </head>
                <body>
                    <h3 style="text-alingt: center;">Usuário ou senha inválidos!</h3>
                    <a href="/login.html" style="text-alingt: center;">Voltar ao Login</a>
                </body>
            </html>
                  `);
    }
});

//rota para processar o cadastro de usuários - endpoint = '/cadastrarUsuarios
app.post('/cadastrarUsuarios', autenticar, processarCadastroUsuario);

app.listen(porta, host, () => {
    console.log(`Servidor executando na url http://${host}:${porta}`);

});


