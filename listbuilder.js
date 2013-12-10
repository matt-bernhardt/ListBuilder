/*
 * Namespace
 */
 window.app = window.app || {};

 /*
  * ListBuilder object
  */
window.app.listbuilder = {

	/*
	* Initialize
	*/
	initialize : function(config) {
		config = config || {};
		this.list = config.listElement || $(".listbuilder");
		// check for console
		if (!window.console) console = { log: function() {} };
		this.debugFlag = config.debugFlag || true;
		this.debug('init called');
		// build list container after identified select list
		listcontainer = document.createElement("div");
		foo = this.list;
		$(listcontainer).attr("class","listcontainer");
		$(this.list).after(listcontainer);
		// build "unselected" and "selected" buckets
		unselected = document.createElement("div");
		$(unselected).attr("class","unselected bucket");
		$(unselected).attr("data-bucket","unselected");
		$(listcontainer).append(unselected);
		selected = document.createElement("div");
		$(selected).attr("class","selected bucket");
		$(selected).attr("data-bucket","selected");
		$(selected).append("<div class='label'>Show:</div>");
		$(listcontainer).append(selected);
		this.syncList();
		// append hidden class to original select list, hiding it
		$(this.list).addClass("listhidden");
		this.debug('init finished');
	},

	/*
	* This is the listener for new interactions with the element
	*/
	getClick : function(bucket) {
		this.debug('click '+bucket.attr('data-value'));
		from = bucket.parent().attr('data-bucket');
		this.debug('from '+from);
		to = from == "unselected" ? "selected" : "unselected";
		// Swap
		$(listcontainer).children("div[data-bucket='"+to+"']").append(bucket);
		this.syncSelect();
	},

	/*
	* This reads the selected bucket and syncs back to the underlying select 
	*/
	syncList : function() {
		this.debug('syncing...');
		// read each item in select list
		$(this.list).children("option").each(function(i,e) {
			console.log(i+' item '+e.value);
			option = document.createElement("div");
			$(option).attr("class","option");
			$(option).attr("data-value",e.value);
			$(option).append(e.text);
			$(unselected).append(option);
		});
		this.debug('sync finished');
	},

	/*
	* This reads the selected bucket and syncs back to the underlying select 
	*/
	syncSelect: function() {
		this.debug('syncing select');
		// wipe existing select states
		$(this.list).children("option").prop('selected',false);
		// rebuild states based on selected contents
		$(selected).children(".option").each(function(i,e) {
			// set this option to be selected
			// console.log("_"+$(this).attr("data-value"));
			$(foo).find("option[value='"+$(this).attr("data-value")+"']").prop('selected',true);
			//console.log(i+' item '+$(e).attr('data-value'));
			//$(this.list).children("option").attr(e.attr('data-value')).prop('selected',true);
		});
		this.debug('select updated');
	},

	/*
	* Write debug message to console
	*/
	debug : function(msg) {
		if(this.debugFlag) {
			console.log(msg);
		}
	}
};