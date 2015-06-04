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
	res = a.clone();
  i = 0;  
  b._data.forEach(function(bRow){
      bRow.forEach(function (bData) {
        res._data[i].push(bData);
      });
      // res._data.push(bCol);
      i++;
  });
  res._size = [a._size[0], a._size[1] + b._size[1]];
  return res;
}

//Funcion para hallar mayor de una matriz

function majorMatrix(A,m,n)
{
  var max;
  for (var i = 0; i < m; i++) {
    for (var j = 0; j < n; j++) {
      if(A.get([i, j])> max) {

        max=A.get([i, j]);
      }

    }

  }
  return max;
}

function pivTotal(Ab,k,marcas){

     var mayor=0;
     var filamayor=k;
     var columnaMayor=k;

     var Absize=Ab.size();
     var fAb = Absize[0]; //filas
     for(var r=k;r<fAb;r++){
          for(var s=k;s<fAb;s++){
               //Se halla el mayor elemento de la Matriz A
               var absAb=Math.abs(Ab.get([r,s]));
               if(absAb>mayor){
                    mayor=absAb;
                    filamayor=r;
                    columnaMayor=s;
               }

          }

     }
     //Se comprueba si el sistema tiene solucion unica
     if(mayor==0){
          alert("El sistema no tiene solucion unica");
     }
     else
     {
         var cAb= Absize[1]; //Columnas
         var fAb=Absize[0];//filas

          if(filamayor!=k){

              var aux= new Array();
             for(var c=0; c<cAb;c++){

                aux[c]=Ab.get([k,c]);
                Ab.set([k,c],Ab.get([filamayor,c]));
                Ab.set([filamayor,c],aux[c]);

           }
          if(columnaMayor!=k){
               //Se hace intercambio de columnas
               
               for(var c=0; c<fAb;c++){
               aux[c]=Ab.get([c,k]);
               Ab.set([c,k],Ab.get([c,columnaMayor]));
               Ab.set([c,columnaMayor],aux[c]); 
                }
               //Se hace intercambio de marcas
               aux=marcas[k];
               marcas[k]=marcas[columnaMayor];
               marcas[columnaMayor]=aux;
          }
     }
  return Ab,marcas;
}
}

function pivParcial (Ab,k) {

var mayor= Math.abs(Ab.get([k,k]));
var filamayor=k;

var Absize= Ab.size();
var fAb = Absize[0]; 


for(var s=k+1;s<fAb;s++){

  var skAb=Math.abs(Ab.get([s,k]));

  if(skAb>mayor){
    
    mayor=skAb;
    filamayor=s;
  }
}

if(mayor==0){

  alert("El sistema no tiene solucion unica");
}
else {


var cAb= Absize[1];

  if(filamayor!=k){

    var aux= new Array();
   for(var c=0; c<cAb;c++){

      aux[c]=Ab.get([k,c]);
      Ab.set([k,c],Ab.get([filamayor,c]));
      Ab.set([filamayor,c],aux[c]);

   }

  }
}
return Ab;
}

function sustitucionRegresiva (Ab) {
 
 var Absize=Ab.size();
 var n=Absize[0];
 
 var x= new Array(n);
 x[n-1]=Ab.get([n-1,n])/Ab.get([n-1,n-1]);
 for(var i=n-2;i>=0;i--){
  var sum=0;
  for(var p=i+1;p<n;p++){
     sum+=Ab.get([i,p])*x[p];
  }
  x[i]=(Ab.get([i,n])-sum)/Ab.get([i,i]);

 }

 return x;
}



//Metodo de Eliminacion Gaussiana Simple

jQuery('#CalcularGS').click(function(){
    
     var A = math.eval(jQuery('#matrizA').val()); 
     var B = math.eval(jQuery('#matrizB').val());     
     eliminacionGS(A,B); 
});


function eliminacionGS(A,B){
    
    var Asize= A.size();
    var AAumentada= augmentedMatrix(A,B);
    var n = Asize[0]; //filas
    var m = Asize[1]; //Columnas

    if (n == m) {
      for (var k = 0; k < n-1; k++) {
        for (var i = k + 1; i < n; i++) {
          factor = AAumentada.get([i,k]) / AAumentada.get([k,k]);
          for(j = k; j < n + 1; j++){
            AAumentada.set([i,j], AAumentada.get([i, j]) - AAumentada.get([k,j]) * factor);
          }
        };
      };
    };

   // return AAumentada;

    AAumentada.toString();
    document.getElementById("resultadoGS").innerHTML = AAumentada;
     
}


// METODO ELMINACIÓN GAUSSIANA CON PIVOTEO PARCIAL


jQuery('#CalcularGPP').click(function(){
     var A = math.eval(jQuery('#matrizAGPP').val()); 
     var B = math.eval(jQuery('#matrizBGPP').val());        
     eliminacionGPP(A,B); 
});


function eliminacionGPP(A,B){

    var Asize= A.size(); 

    var n = Asize[0]; //filas
    var m = Asize[1]; //columnas
    
    if (n == m) {
    var AAumentada= augmentedMatrix(A,B);
    Asize=AAumentada.size();
    m = Asize[1]; //columnas  
     for (var k = 0; k < n-1; k++) {
      AAumentada=pivParcial(AAumentada,k);
      for(var i=k+1; i<n; i++){

        var Mij=AAumentada.get([i,k])/AAumentada.get([k,k]);

        for(var j=0; j<m;j++){

          AAumentada.set([i,j],AAumentada.get([i,j])-Mij*AAumentada.get([k,j]));
        }
      }

    }
    AAumentada.toString();
    document.getElementById("resultadoGPP").innerHTML = AAumentada;
    var x=sustitucionRegresiva(AAumentada);
    x.toString();
    document.getElementById("resultadoGPP").innerHTML =document.getElementById("resultadoGPP").innerHTML+ x;
   
  }
    else {
      
      $('#resultadoGPP').html("<p>Matriz y/o b inadecuados</p>");  

    } 
     
}


// METODO ELMINACIÓN GAUSSIANA CON PIVOTEO TOTAL


jQuery('#CalcularGPT').click(function(){
     var A = math.eval(jQuery('#matrizAGPT').val()); 
     var B = math.eval(jQuery('#matrizBGPT').val());        
     eliminacionGPT(A,B); 
});


function eliminacionGPT(A,B){

    var Asize= A.size(); 
    var n = Asize[0]; //filas
    var m = Asize[1]; //columnas
    // Se verifica que A sea una matriz de nxn
    if (n == m) {

          var AAumentada= augmentedMatrix(A,B);
          //Se generan las marcas de la matriz
          var marcas= new Array();
          for(var t=1;t<n;t++){
               marcas[t]=i;
          }

          for(var k=1;k<n;i--){
               //Se aplica el pivoteo total
          var pivT= pivTotal(AAumentada,k,marcas);
              for(var i=k+1;i<n;i++){
               //Se halla el multiplicador Mij
               var Mij=AAumentada.get([i,k])/AAumentada.get([k,k]);
               //Se calcula la nueva fila i
                 for(var j=0; j<m;j++){
                 AAumentada.set([i,j],AAumentada.get([i,j])-Mij*AAumentada.get([k,j]));
                 }
               
               }
          }
         
           //Se muestra la matriz resultante
           alert(AAumentada);
          AAumentada.toString();
          document.getElementById("resultadoGPT").innerHTML = AAumentada;
          var x=sustitucionRegresiva(AAumentada);

          // Se hallan los valores de x
          var x= sustitucionRegresiva(Ab);
          alert(x);
          x.toString();
          document.getElementById("resultadoGPT").innerHTML =document.getElementById("resultadoGPT").innerHTML+ x;
     }

    else 
    {
      
      $('#resultadoGPT').html("<p>Matriz y/o b inadecuados</p>");  
    }
    
}




//METODO DEL TRAPECIO

jQuery('#CalcularSRT').click(function(){
      var x0= parseFloat(jQuery('#x0SRT').val(),10); 
      var xn= parseFloat(jQuery('#xnSRT').val(),10); 
     var fun= String(jQuery('#funSRT').val());

     trapecioSimple(x0,xn,fun); 
});

function trapecioSimple(x0, xn, fun){
     var h = (xn - x0);
     var funcionx0 = fun.replace(/x/g,x0);
     var fx0 = parser.parse(funcionx0); //Evaluar la función en el valor inicial de x 
     var integ = fx0;     
     var funcionxn = fun.replace(/x/g,xn);
     var fxn = parser.parse(funcionxn); //Evaluar la función en el valor inicial de x
     integ = integ + fxn;
     integ = (h/2)*integ;
     
     $('#resultadoSRT').html("El área bajo la curva "+fun+" entre el intervalo ("+x0+","+xn+") es: "+integ+" + E");  
}





//METODO DEL TRAPECIO COMPUESTO

jQuery('#CalcularCRT').click(function(){
      var x0= parseFloat(jQuery('#x0CRT').val(),10); 
      var xn= parseFloat(jQuery('#xnCRT').val(),10);
      var n= parseFloat(jQuery('#nCRT').val(),10);  
     var fun= String(jQuery('#funCRT').val());

     trapecioCompuesto(x0,xn,n,fun); 
});


function trapecioCompuesto(x0, xn, n, fun){
     var h = (xn - x0)/n;
     var funcionx0 = fun.replace(/x/g,x0);
     var fx0 = parser.parse(funcionx0); //Evaluar la función en el valor inicial de x
     var integ = fx0;
     var suma = 0;
     var res = "";
     var aux = 0;
     for(var i=1;i<n;i++){
          aux = x0+ i*h;
          var funcionxsum = fun.replace(/x/g,aux);
         aux = parser.parse(funcionxsum); //Evaluar la función en el valor inicial de x
          suma = suma + aux;
     }
     integ = integ+ 2*suma;
     var funcionxn=fun.replace(/x/g,xn);
     var fxn = parser.parse(funcionxn); //Evaluar la función en el valor inicial de x
     integ = integ + fxn;
     integ = (h/2)*integ;
}     $('#resultadoCRT').html("El área bajo la curva "+fun+" entre el intervalo ("+x0+","+xn+") es: "+integ+" + E");  


//METODO SIMPLE DE LA REGLA SIMPSON 1/3

jQuery('#CalcularSRS').click(function(){
      var x0= parseFloat(jQuery('#x0SRS').val(),10); 
      var xn= parseFloat(jQuery('#xnSRS').val(),10);  
     var fun= String(jQuery('#funSRS').val());

     simpson13(x0,xn,fun); 
});

function simpson13( x0, xn, fun){
     var h= (xn - x0)/2;
     var funcionx0 = fun.replace(/x/g,x0);
     var fx0 = parser.parse(funcionx0); //Evaluar la función en el valor inicial de x
     var integ = fx0;
     var aux = x0+h
     var funcionaux = fun.replace(/x/g,aux);
     aux = parser.parse(funcionaux); //Evaluar la función en el valor inicial de x
     integ = integ + 4*aux;
     var funcionxn=fun.replace(/x/g,xn);
     var fxn = parser.parse(funcionxn); //Evaluar la función en el valor inicial de x
     integ = integ+ fxn;
     integ = (h/3)*integ;
     
      $('#resultadoSRS').html("El área bajo la curva "+fun+" entre el intervalo ("+x0+","+xn+") es: "+integ+" + E");  
}

//METODO SIMPSON13 COMPUESTO

jQuery('#CalcularCRS').click(function(){
      var x0= parseFloat(jQuery('#x0CRS').val(),10); 
      var xn= parseFloat(jQuery('#xnCRS').val(),10); 
      var n= parseFloat(jQuery('#nCRS').val(),10);  
     var fun= String(jQuery('#funCRS').val());

     simpson13Compuesto(x0,xn,n,fun); 
});

function simpson13Compuesto(x0, xn, n, fun){
      if((n%2)!=0){
          
          $('#resultadoCRS').html(x0+"El numero de intervalos debe ser par.");
     }else{
          var h= (xn - x0)/n;
          var funcionx0 = fun.replace(/x/g,x0);
          var fx0 = parser.parse(funcionx0); //Evaluar la función en el valor inicial de x
          var integ = fx0;
          var suma1 = 0;
          var suma2 = 0;
          
          for(var i=1;i<n;i++){
               
               var aux = x0+(i*h);
               var funcionaux = fun.replace(/x/g,aux);
               aux = parser.parse(funcionaux); //Evaluar la función en el valor inicial de x
               
               if((i%2)==1){
                    suma1 = suma1 + aux;
               }else{
                    suma2 = suma2 + aux;
               }

          }
          integ += 4*suma1;
          integ += 2*suma2;
          var funcionxn = fun.replace(/x/g,xn);
          var fxn = parser.parse(funcionxn); //Evaluar la función en el valor inicial de x
          integ = integ + fxn;
          integ = (h/3)*integ;
          
       $('#resultadoCRS').html("El área bajo la curva "+fun+" entre el intervalo ("+x0+","+xn+") es: "+integ+" + E");  
      }
}

//METODO SIMPLE SIMPSON38 


jQuery('#CalcularSTO').click(function(){
      var x0= parseFloat(jQuery('#x0STO').val(),10); 
      var xn= parseFloat(jQuery('#xnSTO').val(),10);  
     var fun= String(jQuery('#funSTO').val());

     simpson38(x0,xn,fun); 
});

function simpson38(x0, xn, fun){
     var h= (xn - x0)/3;
     var funcionx0 = fun.replace(/x/g,x0);
     var fx0 = parser.parse(funcionx0); //Evaluar la función en el valor inicial de x
     var integ = fx0;    
     var aux = x0+h;
     var funcionaux = fun.replace(/x/g,aux);
     aux = parser.parse(funcionaux); //Evaluar la función en el valor inicial de x
     integ =integ + 3*aux;
     aux = x0 + (2*h);
     funcionaux = fun.replace(/x/g,aux);
     aux = parser.parse(funcionaux); //Evaluar la función en el valor inicial de x
     integ =integ + 3*aux;
     var funcionxn = fun.replace(/x/g,xn);
     var fxn = parser.parse(funcionxn); //Evaluar la función en el valor inicial de x
     integ = integ + fxn;
     integ = (3*h/8)*integ;
      $('#resultadoSTO').html("El área bajo la curva "+fun+" entre el intervalo ("+x0+","+xn+") es: "+integ+" + E");  
}  

//METODO SIMPSON3/8 COMPUESTO

jQuery('#CalcularCSTO').click(function(){
      var x0= parseFloat(jQuery('#x0STO').val(),10); 
      var xn= parseFloat(jQuery('#xnSTO').val(),10);  
     var fun= String(jQuery('#funSTO').val());

     simpson38(x0,xn,fun); 
});

function simpson38Compuesto(x0, xn, n, fun){
     if((n%3)!=0){

            $('#resultadoCSTO').html(x0+"El numero de intervalos debe ser un multiplo de tres.");
     }else{
          var h= (xn - x0)/n;
          var funcionx0 = fun.replace(/x/g,x0);
          var fx0 = parser.parse(funcionx0); //Evaluar la función en el valor inicial de x
          var integ = fx0;
          var suma1 = 0;
          var suma2 = 0;
          var suma3 =0;
          var res = "";
          for(var i=1;i<n;i++){
               if(i%3==1){
                    var aux = x0+(i*h);
                    var funcionaux = fun.replace(/x/g,aux);
                    aux = parser.parse(funcionaux); //Evaluar la función en el valor inicial de x
                    suma1 = suma1+ aux;
               }else{
                    if(i%3==2){
                         var aux = x0+(i*h);
                         var funcionaux = fun.replace(/x/g,aux);
                         aux = parser.parse(funcionaux); //Evaluar la función en el valor inicial de x
                         suma2 = suma2+ aux;
                    }else{
                         var aux = x0+(i*h);
                         var funcionaux = fun.replace(/x/g,aux);
                         aux = parser.parse(funcionaux); //Evaluar la función en el valor inicial de x
                         suma3 = suma3+ aux;
                    }
               }            
          }
          integ = integ + 3*suma1;
          integ = integ + 3*suma2;
          integ = integ + 2*suma3;
          var funcionxn = fun.replace(/x/g,xn);
          var fxn = parser.parse(funcionxn); //Evaluar la función en el valor inicial de x
          integ = integ + fxn;
          integ = (3*h/8)*integ;
          $('#resultadoCSTO').html("El área bajo la curva "+fun+" entre el intervalo ("+x0+","+xn+") es: "+integ+" + E");  
     }
} 