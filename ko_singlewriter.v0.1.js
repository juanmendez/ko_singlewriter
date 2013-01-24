ko.singleWriter = function( init ){
	var _observable = ko.observable(init);
	var _request = ko.observable(init);
	var _writer = null;
	var _writerFN = null;
	    
	//computed observable that we will return
	var result = ko.computed({
	    //always return the actual value
	    read: function() {
	       return _observable();
	    },
	    
	    //observers request, control commits change
	        write: function( newValue, writer) {
	                        
	            if( writer == _writer )
	            {
	            	_observable( newValue );
	            		            	
	            	if( newValue != _request() )
	            	{
	            		_request( newValue );
	            	}
	            }
	            else
	            {
	            	_request( newValue );
	            }
	        }
	    });
	    
	        
    result.setWriter = function( writer )
    {
    	if( _writer !== undefined )
    	{
    		_writer = writer;
    	}
    }
       
    
    result.subscribe = function( fn, writer ){
    	
    	if( writer == _writer )
    	{
    		_writerFN = fn;
    		
    		_request.subscribe( function( value )
			 {			 	
			 	if( value != _observable() )
			 		_writerFN( value );
			 });
    	}
    	else
    		_observable.subscribe( fn );
    }	
	
    return result;
}	
