/*
if (screen.width <=600) {
	window.location = "http://m.misitio.com";
};
*/

$(document).on("ready", paginaCargada);
//$(document).on("deviceready", paginaCargada);

function paginaCargada () {
	$('.contenido img').addClass("animated flipInX");
	$('.input_texto').addClass("animated lightSpeedIn");
	$('#ingresar').addClass("animated zoomIn");
	$('.contenido img').one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oAnimationEnd animationEnd", quitarAnimacion);


}



function quitarAnimacion () {
	$('.contenido img').removeClass("animated flipInX");
	$('.input_texto').removeClass("animated lightSpeedIn");
	$('#ingresar').removeClass("animated zoomIn");
}
$(document).on("pagecreate", "#pagina3", pagina3Cargada);

function pagina3Cargada () {
	$('.servicio_button').addClass("animated rotateIn");
}

//METODO DE BUSQUEDA INCREMENTAL

jQuery('#Calcular').click(function(){
     var x0= parseFloat(jQuery('#x0').val(),10); 
     var x1= parseFloat(jQuery('#x1').val(),10);
     var fun= String(jQuery('#fun').val());
     var delta= parseFloat(jQuery('#delta').val(),10);
     var numIteraciones= parseFloat(jQuery('#numIteraciones').val(),10);  
 	
 	//func=eval(fun);
 	//var func = exec("4 * 5");
     busquedaIncremental(x0,fun,delta,numIteraciones); 
});


function busquedaIncremental(x0,fun,delta,numIteraciones){

    
 	funcionx0=fun.replace(/x/g,x0);
 	var fx0 = parser.parse(funcionx0); //Evaluar la función en el valor inicial de x
    alert(fx0);
 	if (fx0==0)
 	{
 		alert("El valor inicial de x es una raíz" );
 	}

 	else
 	{
 	  var x1= x0+delta; //Valor siguiente a x dependiendo del tamaño del intervalo
 	  funcionx1=fun.replace(/x/g,x1);
 	  var fx1=parser.parse(funcionx1); //Evaluar la función en el valor siguiente a x del intervalo
 	  alert(fx1);
 	  var cont=1;

 	  while(((fx0*fx1)>0) && (cont<=numIteraciones))
 	  	{
 	  		x0=x1;
 	  		fx0=fx1;
 	  		x1=x0+delta;
 	  		funcionx1=fun.replace(/x/g,x1);
 	        var fx1=parser.parse(funcionx1);

 	        cont= cont+1;
 	  	}

 	    if (fx1==0) {

 	    	$('#resultado').html("<p>x1 es raiz</p>"+x1);
 	    }

 	    else if ((fx0*fx1)<0)

 	    {
 	    	$('#resultado').html("<p>Existe una raiz entre</p>"+fx0+ " y "+fx1);
 	    }
 	    else
 	    {
 	    	$('#resultado').html("<p>Fracaso el numero de iteraciones</p>");
 	    }


 	}	

}


//METODO BISECCION

jQuery('#CalcularBS').click(function(){
     var xi= parseFloat(jQuery('#xiBS').val(),10); 
     var xs= parseFloat(jQuery('#xsBS').val(),10); 
     var fun= String(jQuery('#funBS').val());
     var tolerancia= parseFloat(jQuery('#toleranciaBS').val(),10);
     var numIteraciones= parseFloat(jQuery('#numIteracionesBS').val(),10);  
 	

     biseccion(xi,xs,fun,tolerancia,numIteraciones); 
});


function biseccion(xi,xs,fun,tolerancia,numIteraciones){

	funcionxi=fun.replace(/x/g,xi);
 	var fxi = parser.parse(funcionxi);

 	funcionxs=fun.replace(/x/g,xs);
 	var fxs = parser.parse(funcionxs);

 	if(fxi==0)
 	{
 		$('#resultadoBS').html("<p>Fracaso el numero de iteraciones</p>");
 	}
 	else if (fxs==0)
 	{
 		$('#resultadoBS').html("<p>La aproximación inicial superior es una raíz</p>");	
 	}
 	else if ((fxi*fxs)<0)
 	{
 		xm=(xi+xs)/2;
 		funcionxm=fun.replace(/x/g,xm);
 		var fxm = parser.parse(funcionxm);
 		var error=tolerancia+1;
 		var cont=1;
 		while((error>tolerancia)&&(fxm!=0) && (cont<numIteraciones)) {

 			if((fxi*fxm)<0){

 				xs=xm;
 				fxs=fxm;
 			}
 			else {
 				xi=xm;
 				fxi=fxm;
 			}
 			var xaux=xi;
 			xm=(xi+xs)/2;
 			funcionxm=fun.replace(/x/g,xm);
 		    var fxm = parser.parse(funcionxm);
 		    error= Math.abs(xm-xaux);
 		    cont=cont+1;
 		}

 		if(fxm==0){

 		$('#resultadoBS').html("<p>Esta es una raíz</p>"+xm);	

 		}
 		else if(error<tolerancia)
 		{
 		$('#resultadoBS').html("El valor de x" +xm+ "es una raíz con una tolerancia de "+tolerancia);		
 		}
 		else {

 		$('#resultadoBS').html("<p>No se logró encontrar una raíz en el intervalo dado con ese número de iteraciones</p>");	

 		}

 	}

 	else
 	{
 		$('#resultadoBS').html("<p>No se logró encontrar una raíz en el intervalo dado</p>");	
 	}

}


//METODO DE PUNTO FIJO

jQuery('#CalcularPF').click(function(){
     var xi= parseFloat(jQuery('#xiPF').val(),10); 
     var funf= String(jQuery('#funfPF').val());
     var fung= String(jQuery('#fungPF').val());
     var tolerancia= parseFloat(jQuery('#toleranciaPF').val(),10);
     var numIteraciones= parseFloat(jQuery('#numIteracionesPF').val(),10);  
 	

     puntofijo(xi,funf,fung,tolerancia,numIteraciones); 
});


function puntofijo(xi,funf,fung,tolerancia,numIteraciones){

	funcionxi=funf.replace(/x/g,xi);
 	var fxi = parser.parse(funcionxi);
 	alert(fxi);
 	cont=0;
 	error=tolerancia+1;

 	while((error>tolerancia) && (fxi!=0) && (cont<numIteraciones))
 	{
 	    funciong=fung.replace(/x/g,xi);
 	    var xn = parser.parse(funciong);
 	    alert(xn);

 	    funcionxn=funf.replace(/x/g,xn);
 	    var fxn = parser.parse(funcionxn);
        
 	    error= Math.abs((xn-xi)/xn);
 	    alert(error);

 	    xi=xn;
 	    cont=cont+1;
 	}

 	if (fxn==0) {

 		$('#resultadoPF').html("<p>x1 esto es una raiz</p>"+xi);
 	}
 	else if(error<tolerancia){

 		$('#resultadoPF').html("<p>El valor de x</p>"+xi+ "<p>Es una raiz con una tolerancia de</p>"+tolerancia);

 	} else {

 		$('#resultadoPF').html("<p>x1 No se logró encontrar una raíz en el intervalo dado con ese número de iteraciones</p>"+xi);
 	}


}