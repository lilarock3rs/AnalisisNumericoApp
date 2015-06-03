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
    
 	if (fx0==0)
 	{
 		
          $('#resultado').html("<p>El valor inicial de x es una raíz</p>"+x1);
 	}

 	else
 	{
 	  var x1= x0+delta; //Valor siguiente a x dependiendo del tamaño del intervalo
 	  funcionx1=fun.replace(/x/g,x1);
 	  var fx1=parser.parse(funcionx1); //Evaluar la función en el valor siguiente a x del intervalo
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
 	cont=0;
 	error=tolerancia+1;

 	while((error>tolerancia) && (fxi!=0) && (cont<numIteraciones))
 	{
 	    funciong=fung.replace(/x/g,xi);
 	    var xn = parser.parse(funciong);
 	    

 	    funcionxn=funf.replace(/x/g,xn);
 	    var fxn = parser.parse(funcionxn);
        
 	    error= Math.abs((xn-xi)/xn);
 	    

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



//METODO DE LA SECANTE

jQuery('#CalcularSE').click(function(){
     var x0= parseFloat(jQuery('#x0SE').val(),10); 
     var x1= parseFloat(jQuery('#x1SE').val(),10);
     var fun= String(jQuery('#funSE').val());
     var tolerancia= parseFloat(jQuery('#toleranciaSE').val(),10);
     var numIteraciones= parseFloat(jQuery('#numIteracionesSE').val(),10);  
     

     secante(x0,x1,fun,tolerancia,numIteraciones); 
});


function secante(x0,x1,fun,tolerancia,numIteraciones){

     funcionx=fun.replace(/x/g,x0);
     var fx0 = parser.parse(funcionx);

     if(fx0==0){

          $('#resultadoSE').html(x0+"<p>x0 no es raiz</p>");
     }
     else {

     funcionx1=fun.replace(/x/g,x1);
     var fx1 = parser.parse(funcionx1);
     cont=0;
     var error=tolerancia+1;
     var den=fx1-fx0;
     while ((error>tolerancia) &&(fx1!=0) &&(cont<numIteracionesSE))
     {
          var x2=x1-fx1*(x1-x0)/den;
          error=Math.abs(x2-x1);
          x0=fx1;
          fx0=fx1;
          x1=x2;
          funcionx1=fun.replace(/x/g,x1);
          var fx1 = parser.parse(funcionx1);
          den=fx1-fx0;
          cont=cont+1;
     }
     if(fx1==0){

          $('#resultadoSE').html(x1+"<p>x1 es raiz</p>");
     } else if  (error<tolerancia){

           $('#resultadoSE').html("<p>x1 es una aproximación a una raíz con una tolerancia</p>"+tolerancia);
     }
     else if (den==0) {

         $('#resultadoSE').html("<p>hay una posible raíz multiple</p>"); 
     }
     else {

          $('#resultadoSE').html("<p>el método fracasó en el numero de iteraciones</p>"); 

     }

  }
     
}



//METODO DE NEWTON

jQuery('#CalcularNE').click(function(){
     var x0= parseFloat(jQuery('#x0NE').val(),10); 
     var fun= String(jQuery('#funNE').val());
     var fund= String(jQuery('#fundNE').val());
     var tolerancia= parseFloat(jQuery('#toleranciaNE').val(),10);
     var numIteraciones= parseFloat(jQuery('#numIteracionesNE').val(),10);  
     

     newton(x0,fun,fund,tolerancia,numIteraciones); 
});


function newton(x0,fun,fund,tolerancia,numIteraciones){

     funcionx=fun.replace(/x/g,x0);
     var fx0 = parser.parse(funcionx);

     funciondx=fund.replace(/x/g,x0);
     var fdx = parser.parse(funciondx);

     cont=0;
     error=tolerancia+1;

     while( (fx0!=0) && (fdx!=0) && (error>tolerancia)&&(cont<numIteraciones)){

          var x1= x0-(fx0/fdx);

          funcionx=fun.replace(/x/g,x1);
          var fx0 = parser.parse(funcionx);

          funciondx=fund.replace(/x/g,x1);
          var fdx = parser.parse(funciondx);

          error= Math.abs((x1-x0)/x1);
          x0=x1;
          cont=cont+1;
     }

     if (fx0==0){

            $('#resultadoNE').html("<p>Xo es Raiz</p>"+x0); 
     }
     else if (error<tolerancia)
     {
       $('#resultadoNE').html(x0+"<p>es una raiz aproximada con una tolerancia </p>"+tolerancia);    
     }
     else if (fdx==0){

           $('#resultadoNE').html(x0+"<p>es posiblemente una raiz múltiple</p>");
           }
           else{
               $('#resultadoNE').html(x0+"<p>Fracaso el número de iteraciones</p>");
           }
      
     
}

//METODO DE RAICES MULTIPLES

jQuery('#CalcularRM').click(function(){
     var x0= parseFloat(jQuery('#x0RM').val(),10); 
     var fun= String(jQuery('#funRM').val());
     var fund= String(jQuery('#fundRM').val());
     var funsd= String(jQuery('#funsdRM').val());
     var tolerancia= parseFloat(jQuery('#toleranciaRM').val(),10);
     var numIteraciones= parseFloat(jQuery('#numIteracionesRM').val(),10);  
     

     raicesmultiples(x0,fun,fund,funsd,tolerancia,numIteraciones); 
});


function raicesmultiples(x0,fun,fund,funsd,tolerancia,numIteraciones){
    

     funcionx=fun.replace(/x/g,x0);
     var fx0 = parser.parse(funcionx);

     funciondx=fund.replace(/x/g,x0);
     var fdx = parser.parse(funciondx);

     funcionsdx=fund.replace(/x/g,x0);
     var fsdx = parser.parse(funcionsdx);

     var operacion= Math.pow(fdx,2) - (fx0*fsdx);
     var cont=0;
     error=tolerancia+1;
     while((fx0!=0)&&(operacion!=0)&&(error<tolerancia)&&(cont<numIteraciones))
     {
          x1=x0-((fx0*fdx)/operacion);

          funcionx=fun.replace(/x/g,x1);
          var fx0 = parser.parse(funcionx);

          funciondx=fund.replace(/x/g,x1);
          var fdx = parser.parse(funciondx);

          funcionsdx=fund.replace(/x/g,x1);
          var fsdx = parser.parse(funcionsdx);

          error=Math.abs((x1-x0)/x1);
          var operacion= Math.pow(fdx,2) - (fx0*fsdx);
          x0=x1;
          cont=cont+1;
     }

     if(fx0==0){

          $('#resultadoRM').html("<p>Xo es Raiz</p>"+x0); 

     }
     else if(error<tolerancia){

          $('#resultadoRM').html(x0+"<p> X0 es una raiz aproximada con una tolerancia </p>"+tolerancia);   
     }
     else if(operacion==0){

       $('#resultadoRM').html("<p>El denominador se hace cero</p>");     
     }
     else
     {
       $('#resultadoRM').html("<p>Fracaso el número de iteraciones</p>"); 
     }
      
     
}

//Funcion aumentada

function augmentedMatrix (a, b) {
    b._data.forEach(function (bBol) {
        a._data.push(bBol);
    });
    return a;
}

//Metodo de Eliminacion Gaussiana Simple

jQuery('#CalcularGS').click(function(){
    
     var A = math.eval(jQuery('#matrizA').val()); 
     var B = math.eval(jQuery('#matrizB').val()); 
    
     // var matrix = math.matrix([[1, 2], [3, 4]]);

     // alert(matrix);

     eliminacionGS(A,B); 
});


function eliminacionGS(A,B){
    
    var Asize= A.size();
    var AAumentada= augmentedMatrix(A,B);

    var Asizen=Asize[0]; 
    var Asizem=Asize[1];

    if(Asizen==Asizem)  {

     for(k=1; k<n-1; k++){
        for(i=k+1; i=<n; i++){

          


        }

     }
    }

       

     alert(Asizen);

}


