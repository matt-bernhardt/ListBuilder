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
		original = this.list;
		$(listcontainer).attr("class","listcontainer");
		$(this.list).after(listcontainer);
		// build "unselected" and "selected" buckets
		unselected = document.createElement("div");
		$(unselected).attr("class","unselected bucket");
		$(unselected).attr("data-bucket","unselected");
		// build filter input
		$(unselected).append("<div class='label'><label for='listfilter'>Search:</label><input type='text' name='listfilter' id='listfilter'><a class='reset'>Clear</a></div>");
		$(listcontainer).append(unselected);
		selected = document.createElement("div");
		$(selected).attr("class","selected bucket");
		$(selected).attr("data-bucket","selected");
		$(selected).append("<div class='label'>Show:</div>");
		$(listcontainer).append(selected);
		this.populateList();
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
		this.sortList(selected);
		this.sortList(unselected);
	},

	/*
	* This is the listener for the filter input on the unselected bucket
	*/
	getFilter : function(string) {
		// function should be case-insensitive
		string = string.toLowerCase();
		$(unselected).children(".option").each(function() {
			// reset hidden states
			$(this).removeClass("hidden");
			// function should be case-insensitive
			theValue = $(this).attr('data-value').toLowerCase();
			if(theValue.indexOf(string) == -1){
				$(this).addClass("hidden");
			}
		});
	},

	/*
	* This reads the contents of the underlying select control and populates the unselected bucket
	*/
	populateList : function() {
		this.debug('syncing...');
		// read each item in select list
		$(this.list).children("option").each(function(i,e) {
			option = document.createElement("div");
			$(option).attr("class","option");
			$(option).attr("data-value",e.value);
			$(option).append(e.text);
			if(e.selected==false) {
				$(unselected).append(option);
			} else {
				$(selected).append(option);
			}
		});
		this.debug('sync finished');
	},

	/*
	* This empties the search/filter control
	*/
	resetFilter : function() {
		$("#listfilter").val('');
		this.getFilter('');
	},

	/*
	* This function will sort the contents of a supplied list element
	* From http://stackoverflow.com/a/304428/2245617
	*/
	sortList : function(list) {
		this.debug('sorting list');
		var items = $(list).children('div.option').get();
		items.sort(function(a,b) {
			var keyA = $(a).text();
			var keyB = $(b).text();

			if (keyA < keyB) return -1;
			if (keyA > keyB) return 1;
			return 0;
		});
		var ul = $(list);
		$.each(items, function(i, li) {
			ul.append(li);
		});
		this.debug('list sorted');
	},

	/*
	* This reads the contents of the selected bucket and syncs statuses back to the underlying select control
	*/
	syncSelect: function() {
		this.debug('syncing select');
		// wipe existing select states
		$(this.list).children("option").prop('selected',false);
		// rebuild states based on selected contents
		$(selected).children(".option").each(function(i,e) {
			// set this option to be selected
			$(original).find("option[value='"+$(this).attr("data-value")+"']").prop('selected',true);
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