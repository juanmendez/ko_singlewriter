ko-singlewriter
===============

this is an extension to knockoutjs. for more information about knockoutjs go to http://knockoutjs.com/

singleWriter follows up the observer pattern.
 
There can be situations where several views update, but require a single writer to 
orchestrate the data, and in such case, the views only set requests to it. 

The way this simple extension to knockoutjs works is as follows
 
 1. an object (named 'writer') confirms with ko_observable to be its data owner
 var ko_observable = ko.singleWriter();
 var writer = {};
 
 ko_observable.setWriter( writer );
 
 2. writer requires to read updates from other subscribers or binding elements
 ko_observable.subscribe( function(newValue){}, writer );
 
 3. subscribers and binding elements read data as usual
 
 4. subscribers request updates they want to see in ko_observable
 ko_observable( 3 );
 
  5. Otherwise binding elements such as text inputs appear as updating ko_observable traditionally, 
  but instead it is interpreted by the extension as a request.
 
  6. through step 2, writer is able to make such changes
   
ko_observable.subscribe( function(newValue){
 	  //do any necessary work and conditions for the next line
                   ko_observable( 3, writer )  	
  }, writer );

here are two jsfiddle examples using this extension
http://jsfiddle.net/juanmendez/zkRFc/
http://jsfiddle.net/juanmendez/MkSxm/

