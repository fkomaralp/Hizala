/**
 * hizala.js
 * 
 * Copyright (c) 2013 GAYRETSOFT (http://gayretsoft.com)
 * is licensed under the MIT license.
 * http://opensource.org/licenses/MIT or LICENSE.txt
 * 
 * Gerçek zamanlı hızala kontrol uygulaması.
 * 
 * Author : Fatih Komaralp 
 * Version : 1.0
 * Date : 24 Aug 2013, 18:33:08
 */

(function($, window){
    
    var globals = {
        current_selector : ""
    }
    
    $.fn.hizala = function(){
                
        $('body').append('<div id="hizala-container"><div class="h-btn" data-action="hide">>></div><div class="h-settings"><div class="btn-new h-s-createnewx" title="New X Line">Yeni Dikey</div><div class="btn-new h-s-createnewy" title="New Y Line">Yeni Yatay</div><div class="btn-delete h-s-delete" title="Delete All">Tümünü Sil</div></div></div>');
        
        // Container style
        $('#hizala-container').css({"z-index" : "11111",  "position" : "absolute", "display" : "block","top" : "100px","left" : "0px"});
        
        // container open botton style
        $('#hizala-container .h-btn').css({"width" : "40px","height" : "25px","background-color" : "rgb(100, 167, 213)", "color" : "#fff","line-height" : "25px","text-align" : "center","border-radius" : "0 20px 20px 0px", "cursor" : "pointer"});
        
        // Settings box style
        $('#hizala-container .h-settings').css({"width" : "200px","height" : "100px","margin" : "-25px 0px 0px -200px", "background-color" : "rgb(113, 171, 235)", "color" : "#fff"});
        
        // Action botton styles
        $('#hizala-container .h-settings > div').css({"text-align" : "center", "line-height" : "25px", "width" : "80px" , "height" : "25px", "cursor" : "pointer","border": "1px solid rgb(235, 235, 235)","display": "block","float": "left"});
        $('#hizala-container .h-settings .btn-new').css({"background-color": "rgb(100, 167, 213)","margin" : "8px"});
        $('#hizala-container .h-settings .btn-delete').css({"background-color": "rgb(247, 119, 95)","margin" : "10px 0px 0px 53px","padding" : "3px"});
        
        $('#hizala-container .h-btn').bind('click', function(){
           
            if($('#hizala-container .h-btn').data("action") === "hide") {
                
                $('#hizala-container .h-btn').data("action", "show").text("<<").animate({"margin-left" : "200px"});
                $('#hizala-container .h-settings').animate({"margin-left" : "0px"});
                
            } else {
                $('#hizala-container .h-btn').data("action", "hide").text(">>").animate({"margin-left" : "0px"});
                $('#hizala-container .h-settings').animate({"margin-left" : "-200px"});
            }
        })
        
        $('#hizala-container .h-settings .h-s-createnewx').bind('click', function(){
            
                var unique_id = Math.floor(Math.random()*99999999);

                $('body').append('<div class="hizala-x-line ' + unique_id +'"></div>');
                $('.' + unique_id).css({"top":"0","left":"50px" , "position" : "absolute", "width" : "3px", "height" : "100%", "background-color" : "#000", "cursor" : "e-resize"});

                $('body .hizala-x-line').bind('mousedown', function(){

                    globals.current_selector = $(this).get(0);

                    $(document).bind('mousemove', function(e){
                        $(globals.current_selector).css({ "left" : e.clientX + "px" });
                    });            

                }).bind('mouseup', function(){
                    $(document).unbind('mousemove');
                });

        });
  
        $('#hizala-container .h-settings .h-s-createnewy').bind('click', function(){
            
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
            
        });
        
        $('#hizala-container .h-settings .btn-delete').bind('click', function(){
           
           $('.hizala-x-line').remove();
           $('.hizala-y-line').remove();
            
        });
        
        
    }
    
}(jQuery));