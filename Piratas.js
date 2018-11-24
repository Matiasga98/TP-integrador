

function Pirata(unaEnergia){
	this.energia = unaEnergia

	this.poderDeMando = function(){}
	this.efectoRon = function(){
		this.energia -=50
	}
	this.esFuerte = function(){
		return this.poderDeMando()>100
	}
}

Guerrero.prototype = new Pirata()
function Guerrero(unPoder, unaVitalidad){
	this.poder = unPoder
	this.vitalidad = unaVitalidad

	this.poderDeMando = function(){
		return this.poder * this.vitalidad
	}
	this.herido = function(){
		this.poder /= 2
	}
}

Navegante.prototype = new Pirata()
function Navegante(unaInteligencia){
	this.inteligencia = unaInteligencia

	this.poderDeMando = function(){
		return this.inteligencia * this.inteligencia
	}
	this.herido = function(){
		this.inteligencia /= 2
	}
}

Cocinero.prototype = new Pirata()
function Cocinero(unaMoral, unosIngredientes){
	this.moral = unaMoral
	this.ingredientes = unosIngredientes

	this.poderDeMando = function(){
		return this.ingredientes.length*this.moral
	}
	this.herido = function(){
		this.moral /= 2
	}

	this.robarIngrediente = function(unIngrediente){
			var index = this.ingredientes.indexOf(unIngrediente)
			if (index > -1) {
     			this.ingredientes.splice(index, 1);
   			}
   			jackSparrow.agregarIngrediente(unIngrediente)
	}

	this.efectoRon = function(){
		this.energia -=50		//che lucas como se usa super?
		this.robarIngrediente(this.ingredientes[Math.floor(Math.random()*this.ingredientes.length)]);
		
	}
}

jackSparrow = new Pirata(500)
jackSparrow.poder = 200;
jackSparrow.inteligencia = 300
jackSparrow.ingredientes = ["Ron"]

jackSparrow.poderDeMando = function(){
		return this.poder*this.inteligencia*this.energia
	}
	jackSparrow.tomarRonCon = function(unPirata){
		this.energia +=100
		unPirata.efectoRon()
	}
	jackSparrow.agregarIngrediente = function(unIngrediente){
		this.ingredientes.push(unIngrediente)
	}
	jackSparrow.herido = function(){
		this.poder /= 2
		this.inteligencia /= 2
	}




monstruo.prototype = new Pirata()
function monstruo(unPoder){
	this.poder = unPoder
	this.poderDeMando = function(){
		return this.poder
	}
	this.herido = function(){
		this.poder /= 2
	}
}



// aca arranca barco

function barco(unaResistencia, unPoderDeFuego, unaTripulacion, unaMunicion, unBando) {
	this.resistencia = unaResistencia
	this.poderDeFuego = unPoderDeFuego
	this.municion = unaMunicion
	this.bando = unBando
	this.tripulacion = unaTripulacion

	this.capitan = function(){
		var res = Math.max.apply(Math, this.tripulacion.map(function(unPirata) { return unPirata.poderDeMando(); }))
		return this.tripulacion.find(function(unPirata){ return unPirata.poderDeMando() == res; })
	} /*esto es un asco, como se puede hacer mejor?*/

	this.poderBarco = function(){
		var poderesDeMando = this.tripulacion.map(function(unPirata) {return unPirata.poderDeMando()})
		return poderesDeMando.reduce(( a , b ) => a + b)
	}

	this.enfrentamiento= function(otroBarco) {
		if (this.poderBarco() > otroBarco.poderBarco()){
			this.efectoBatalla(this,otroBarco)
		}
		else{
			this.efectoBatalla(otroBarco,this)
		}
	}

	this.efectoBatalla = function(ganador,perdedor){
		perdedor.tripulacion.forEach(function(unPirata,i,tripu){
			tripu[i].herido();
		});
		Array.prototype.push.apply(ganador.tripulacion, perdedor.tripulacion.filter(unPirata => unPirata.esFuerte()));
		//ganador.tripulacion.push(perdedor.tripulacion.filter(unPirata => unPirata.poderDeMando()>100))
		perdedor.tripulacion.splice(0,this.tripulacion.length)
		perdedor.desolado()
	}

	this.desolado = function(){
		this.resistencia = 0
		this.poderDeFuego = 0
		this.municion = 0
	}

	this.canionazo = function(cant,otroBarco){
		if (this.municion<cant){
			throw "no te alcanzan las balas papu"
		}
		this.municion -= cant
		otroBarco.golpeado(cant)
	}

	this.golpeado = function(cant){
		this.bajarResistencia(50*cant)
		this.tripulacion = this.tripulacion.filter(unPirata => unPirata.poderDeMando()>20)
	}

	this.bajarResistencia = function(cant){
		this.resistencia -=cant
	}

	this.aumentarMunicion = function(cant){
		this.municion*=cant
	}

	this.aumentarPoderDeFuego = function(cant){
		this.poderDeFuego+=cant
	}

	this.duplicarTripulacion = function(){
		this.tripulacion = this.tripulacion.concat(this.tripulacion)
	}

	this.efectoBando = function(){
		this.bando.efectoBando(this)
	}

}


armadaInglesa = new Object();
armadaInglesa.efectoBando = function(unBarco){
		unBarco.aumentarMunicion(1.30)
}

unionPirata = new Object();
unionPirata.efectoBando = function(unBarco){
		unBarco.aumentarPoderDeFuego(60)
}


holandesErrante = new Object()
holandesErrante.efectoBando = function(unBarco){
		unBarco.duplicarTripulacion()
}



//tests
deko = new Cocinero(1, ["shauaua","diente"])
jose = new monstruo(500)
barcodejose = new barco(1,2,[jose],1,holandesErrante)
thomasElBarquito = new barco(1,2,[deko,jackSparrow],3,unionPirata)
moop = new Navegante(9999)
simon = new Guerrero(1000,200)
barcoPeposo = new barco(10,50,[moop,simon],100,armadaInglesa)