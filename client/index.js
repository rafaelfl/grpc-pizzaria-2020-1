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

const client = new protoDescriptor.PizzaService('localhost:50051', grpc.credentials.createInsecure());

// client.ConsultarPizzas({}, function(err, response) {
//     if (err != null) {
//         console.log("Ocorreu um erro!");
//         return;
//     }

//     console.log(response.pizzas);
// });

// client.ConsultarUmaPizza({ indice: 2 }, function(err, response) {
//     if (err != null) {
//         console.log("Ocorreu um erro!");
//         return;
//     }

//     const pizza = response;

//     console.log(pizza);
// });

client.CadastrarPizza({ nome: "Bacon", foto: "sdnfkjsdnfjdns", preco: 31.50 }, function(err, response) {
    if (err != null) {
        console.log("Ocorreu um erro!");
        return;
    }

    console.log("Pizza cadastrada!");

    client.ConsultarPizzas({}, function(err, response) {
        if (err != null) {
            console.log("Ocorreu um erro!");
            return;
        }
    
        console.log(response.pizzas);
    });
});