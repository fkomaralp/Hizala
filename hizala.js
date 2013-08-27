/**
 * hizala.js
 * 
 * Copyright (c) 2013 GAYRETSOFT (http://gayretsoft.com)
 * is licensed under the MIT license.
 * http://opensource.org/licenses/MIT or LICENSE.txt
 * 
 * Gerçek zamanlı hiza kontrol uygulaması.
 * 
 * Author : Fatih Komaralp 
 * Version : 1.0
 * Date : 24 Aug 2013, 18:33:08
 */

(function($){
    
    // Make Hizala(aka Aligment) window
    var htmlBody = '<div id="hizala-container"><div class="h-sorh-btn" data-action="hide">>></div><div class="h-s-container"><div class="h-s-createnewx" title="New X Line">Yeni Dikey</div><div class="h-s-createnewy" title="New Y Line">Yeni Yatay</div><div class="btn-delete-all" title="Delete All">Tümünü Sil</div></div></div>';
    
    // Set window styles       
    var cssBody = '<style type=\'text/css\'>' +
                        '#hizala-container {position:absolute;display:block;top:100px;left:0px;z-index:55555;}' + 
                        '#hizala-container .h-sorh-btn {width:40px;height:25px;background-color:rgb(100, 167, 213);color:#fff;line-height:25px;text-align:center;border-radius:0 20px 20px 0px;cursor:pointer}' +
                        '#hizala-container .h-s-container {width:200px;height:100px;margin:-25px 0px 0px -200px;background-color:rgb(113, 171, 235);color:#fff}' +
                        '#hizala-container .h-s-container > div {width:80px;height:25px;border:1px solid rgb(235, 235, 235);display:block;float:left;text-align:center;line-height:25px;cursor:pointer;}' +
                        '#hizala-container .h-s-container .h-s-createnewx,#hizala-container .h-s-container .h-s-createnewy, #hizala-container .h-s-container .btn-delete-all {background-color:rgb(100, 167, 213);margin:8px}' +
                        '#hizala-container .h-s-container .btn-delete-all {background-color:rgb(247, 119, 95);margin:10px 0px 0px 53px;padding:3px}' +
                  '</style>';
          
    // Globals for temp elements
    var globals = {
        current_selector : ""
    }
    
     /* Private methods */
    _hizala = {
        
        showorhide : function(){
            
            // showorhide Button settings
            if($('#hizala-container .h-sorh-btn').data("action") === "hide") {
                $('#hizala-container .h-sorh-btn').data("action", "show").text("<<").animate({"margin-left" : "200px"});
                $('#hizala-container .h-s-container').animate({"margin-left" : "0px"});
            } else {
                $('#hizala-container .h-sorh-btn').data("action", "hide").text(">>").animate({"margin-left" : "0px"});
                $('#hizala-container .h-s-container').animate({"margin-left" : "-200px"});
            }
            
        },
                
        newxline : function(){
            
            // Random a new unique key for no conflict
            var unique_id = Math.floor(Math.random()*99999999);
            
            // Make a new x line on the page
            $('body').append('<div class="hizala-x-line ' + unique_id +'"></div>');
            
            // And then, set style of this "x" line
            $('.' + unique_id).css({"top":"0",
                "left":"50px" , 
                "position" : "absolute", 
                "width" : "3px", 
                "height" : "100%", 
                "background-color" : "#000", 
                "cursor" : "e-resize"});
            
            // mousedown Event for the capture current div element
            $('body .hizala-x-line').bind('mousedown', function(){
                
                // Get current div element style tag
                globals.current_selector = $(this).get(0);
                
                // Set globaly mousemove event and make a moveable properties for the current div
                $(document).bind('mousemove', function(e){
                    // Set new coordinates for clicked div
                    $(globals.current_selector).css({ "left" : e.clientX + "px" });
                });            
                
               // Unbind mousemove event if mouseup event is activated 
            }).bind('mouseup', function(){
                $(document).unbind('mousemove');
            });

        },
  
        newyline : function(){
            
                var unique_id = Math.floor(Math.random()*99999999);

                $('body').append('<div class="hizala-y-line ' + unique_id +'"></div>');
                
                $('.' + unique_id).css({"top":"50px","left":"0" , "position" : "absolute", "width" : "100%", "height" : "3px", "background-color" : "#000", "cursor" : "n-resize"});

                $('body .hizala-y-line').bind('mousedown', function(){

                    globals.current_selector = $(this).get(0);

                    $(document).bind('mousemove', function(e){
                        $(globals.current_selector).css({ "top" : e.clientY + "px" });
                    });            

                }).bind('mouseup', function(){
                    $(document).unbind('mousemove');
                });
        },
        
        deleteall : function(){
           
           // Delete all lines on the page
           $('.hizala-x-line').remove();
           $('.hizala-y-line').remove();
            
        }
    }
    
    // SETUP
    $.fn.hizala  = function(){
        
        // Setup the settings window
        $('head').append(cssBody);
        $('body').append(htmlBody);
        
        // Add click event to showorhide button
        $('#hizala-container .h-sorh-btn').bind('click', function(){
            _hizala.showorhide();
        });
        
        // Add click event to new x line button
        $('#hizala-container .h-s-container .h-s-createnewx').bind('click', function(){
            _hizala.newxline();
        });
        
        // Add click event to new y line button
        $('#hizala-container .h-s-container .h-s-createnewy').bind('click', function(){
            _hizala.newyline();
        });
        
        // Add click event to delete all button
        $('#hizala-container .h-s-container .btn-delete-all').bind('click', function(){
            _hizala.deleteall();
        });
    }
    
}(jQuery));