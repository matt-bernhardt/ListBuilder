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
	initialize : function() {

	},

	/*
	* This is the listener for new interactions with the element
	*/
	getClick : function(bucket) {

	},

	/*
	* This keeps the underlying select element in sync with the selected bucket
	*/
	syncList : function() {

	},

	/*
	* Write debug message to console
	*/
	debug : function(msg) {
		if(this.debugFlag) {
			console.log(msg);
		}
	}
}