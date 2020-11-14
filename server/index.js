// definição do caminho do arquivo proto
const PROTO_PATH = "./pizzaria.proto";

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

// carregamento do arquivo proto e geração das definições
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
});

var protoDescriptor = grpc.loadPackageDefinition(packageDefinition).pizzaria;

const bd = [
    {
        nome: "Calabresa",
        foto: "https://t1.rg.ltmcdn.com/pt/images/9/8/3/img_pizza_calabresa_e_mussarela_4389_orig.jpg",
        preco: 22.0,
    },
    {
        nome: "Frango com Catupiry",
        foto: "https://i.pinimg.com/564x/7b/55/23/7b55236e17372bcb1315610c439cb0cb.jpg",
        preco: 10.0,
    },
    {
        nome: "Portuguesa",
        foto: "https://pizzariameurancho.com.br/wp-content/uploads/2016/06/pizza-portuguesa_min.jpg",
        preco: 26.0,
    },
    {
        nome: "Carne de Sol",
        foto: "https://www.picanhacia.com.br/wp-content/uploads/2017/01/11379225_1180312101994735_933388139_n-13-510x320.jpg",
        preco: 40
    }
];

const consultarPizzas = (call, callback) => {
    console.log("Consultar pizzas");

    callback(null, {
        pizzas: bd,
    });
}

const consultarUmaPizza = (call, callback) => {
    console.log("Consultar um pizza");

    const nrPizza = call.request.indice;

    callback(null, bd[nrPizza]);
}

const cadastrarPizza = (call, callback) => {
    console.log("Cadastrar pizza");

    const nome = call.request.nome;
    const foto = call.request.foto;
    const preco = call.request.preco;

    bd.push({
        nome: nome,
        foto: foto,
        preco: preco,
    });

    callback(null, {});
}

function getServer() {
    var server = new grpc.Server();

    server.addService(protoDescriptor.PizzaService.service, {
        ConsultarPizzas: consultarPizzas,
        ConsultarUmaPizza: consultarUmaPizza,
        CadastrarPizza: cadastrarPizza,
    });

    return server;
  }

  var routeServer = getServer();
  routeServer.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure() );
  routeServer.start();