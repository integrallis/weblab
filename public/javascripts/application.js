// var SNIPPETS = (function() {
// 	var module = {};
// 	
// 	module.set_code_areas() {
// 		
// 	}
// 	
// }());

var js_editor;
var markup_editor;
var css_editor;

function set_code_areas() {
	try {
		js_editor = CodeMirror.fromTextArea('snippet_code', {
		    height: "350px",
		    parserfile: ["tokenizejavascript.js", "parsejavascript.js"],
			stylesheet: "/stylesheets/codemirror/jscolors.css",
			path: "/javascripts/",
			autoMatchParens: true
		});
	
		markup_editor = CodeMirror.fromTextArea('snippet_markup', {
		    height: "350px",
		    parserfile: "parsexml.js",
		    stylesheet: "/stylesheets/codemirror/xmlcolors.css",
			path: "/javascripts/",
			autoMatchParens: true
		});
	
		css_editor = CodeMirror.fromTextArea('snippet_css', {
		    height: "350px",
			parserfile: "parsecss.js",
		    stylesheet: "/stylesheets/codemirror/csscolors.css",
			path: "/javascripts/",
			autoMatchParens: true
		});
	} catch (error) {
		log.error('puppy pants!');
	}
}
function set_buttons() {
	$('button, .button-list li').button();	
}
function enable_tabs() {
	$('#tabs').tabs();
}
function preview_dialog() {
	$('#script_result').dialog({
		autoOpen: false,
		resizable: false,
		height: 600,
		width: 800,
		modal: true,
		title: 'Weblab Preview'
	});
}
function new_snippet() {
	var $new_snippet_dialog = $('#add_snippet_dialog').dialog({
		autoOpen: false,
		modal: true,
		buttons: {
			'Add': function() {
				add_snippet();
				$(this).dialog('close');
			},
			'Cancel': function() {
				$(this).dialog('close');
			}
		},
		open: function() {
			//$tab_title_input.focus();
		},
		close: function() {
			$form[0].reset();
		}
	});	

	// add snippet form: calls add snippet function on submit and closes the dialog
	var $form = $('form', $new_snippet_dialog).submit(function() {
		add_snippet();
		$new_snippet_dialog.dialog('close');
		return false;
	});
	
	// addTab button: just opens the dialog
	$('#add_snippet').click(function() {
		$new_snippet_dialog.dialog('open');
	});
	
	function add_snippet() {
		var title = $('#snippet_title').val();
		log.info("AJAX adding a snippet with title " + title);
		var new_snippet_form = $('#new_snippet');
		try {
			$.ajax({
	        	type: "POST",
	        	url: $(new_snippet_form).attr('action'),
	        	data: $(new_snippet_form).serialize(),
	        	success: function() {
		            $('#flashes').html('<p class="notice"><span></span>Snippet ' + title + ' was successfully created!</p>');
					$('#snippet_table tbody tr').last().effect( 'bounce', {}, 2500, null);
		            $('p.notice').fadeOut(2500);
	        	}
	        });
	    } catch(e) {
			log.error('An error occurred ' + e);
	    }
	}
}
function run_snippet() {
	$('#run_snippet').click(function() {
		// only show html modal dialog if example is visual
		if ($('#snippet_visual').is(':checked')) {
			$('#script_result').dialog('open');
		}
		
		// get the document object for the iframe
		var iframe_document = $("iframe#script_result")[0].contentWindow.document;
		
		// grab the snippet javascript code
		var script_text = js_editor.getCode(); //$("#snippet_code").val();
		
		// grab the snippet html
		var markup = markup_editor.getCode(); // $("#snippet_markup").val();
		var css = css_editor.getCode(); //$("#snippet_css").val();
		
		//log.info("Markup ==>" + markup);
		
		// render the html to the iframe
		iframe_document.open();
		iframe_document.write(markup);
		iframe_document.close();
	
	    // wrap the javascript code in a function
		var script = new Function( "document", script_text );
		//var script = new Function( script_text );
		
		// on the on ready of the iframe execute the javascript in the context of the iframe
		//$.frameReady(function(){ script() }, "script_result");
		$(iframe_document).ready(function() {
			log.debug("before the script");
		    script(iframe_document);
		 	log.debug("after the script");
		});
	
	    log.info("The End");
	});
}
function save_snippet() {
	$('#save_snippet').click(function() {
		log.info("before the submit");
		var snippet_form = $('.edit_snippet');
		log.info("snippet_form ==> " + snippet_form);

		$("#snippet_code").val(js_editor.getCode());
		$("#snippet_markup").val(markup_editor.getCode());
		$("#snippet_css").val(css_editor.getCode());
		
		log.info("after getting the code from the editors");
		
		log.info("snippet_form.action ==> " + $(snippet_form).attr('action'));
		try {
			$.ajax({
	        	type: "POST",
	        	url: $(snippet_form).attr('action'),
	        	data: $(snippet_form).serialize(),
	        	success: function() {
		            $('#flashes').html('<p class="notice"><span></span>Snippet was successfully saved!</p>');
		            $('p.notice').fadeOut(2500);
	        	}
	        });
	    } catch(e) {
			log.error('An error occurred ' + e);
	    }
	    log.info("after the submit");
	    return false;
	});
}
function toggle_console() {
	$("#toggle_console").click(function() {
		log.toggle();
	});
}
function clear_all() {
	$("#clear_all").click(function() {
		log.clear();
		$("iframe#script_result").attr('src', 'about:blank');
	});
}
function hide_snippet_dialog() {
	$('#add_snippet_dialog').hide();
}

$(document).ready(function() {
	// hide snippet dialog
	hide_snippet_dialog();
	
	// set all buttons
    set_buttons();
	
	// preview dialog
    preview_dialog();
	
	// sets new snippet functionality
    new_snippet();
	
	// toggle console
	toggle_console();
	
	// clear all
	clear_all();
});


