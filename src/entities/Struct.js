class Struct {
    id;
    name;
    description;
    datasets;

    constructor(){}
    constructor(id, name, description, datasets){
        this.id = id;
        this.name = name;
        this.description = description;
        this.datasets = datasets;
    }

}

exports.Struct = Struct;

/*
const datastructs = [
    {
        id: 1,
        name: "Ejercicio",
        description: "Set de datos para seguir tu avance en el ejercicio.",
        datasets: [
            repetitions = {
                type: "number",
                varName: "Repeticiones por serie",
                minVal: 0,
                maxVal: 100
            },
            exercise = {
                type: "text",
                varName: "Ejercicio"
            },
            series = {
                type: "number",
                varName: "Series realizadas",
                minVal: 0,
                maxVal: 10
            },
            potencia = {
                type: "number",
                varName: "Potencia al realizar los ejercicios",
                minVal: 0,
                maxVal: 5
            }
        ]   
    },{
        id: 2,
        name: "EJEMPLO",
        description: "Set ejemplo",
        datasets: [
            ej1 = {
                type: "number",
                varName: "Repeticiones por serie",
                minVal: 0,
                maxVal: 100
            },
            ej2 = {
                type: "text",
                varName: "Ejercicio"
            }
        ]   
    }
]
*/