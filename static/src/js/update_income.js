odoo.define('budget_expense_management.myincomes', function(){ 
 "use strict" 
 	

	$(document).ready(function(){
		
		//Call Delete request and return Get Response
		
		$('button[name="del_income"]').click(function() {
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function () {
				if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200) {
					window.location.href = '/my_incomes';
				}
			};
			var data = {"income_id": this.value };
			var url = "/my_incomes";
			xhttp.open("DELETE", url, true);
			xhttp.setRequestHeader('Content-type', 'application/json');
			data = JSON.stringify(data)
			xhttp.send(data);
		})
	
		$('td').on('click', function(e) { 
			if ('text-right td_marked' == ($(this).context.className)) {
				if ($(this).context.id === 'acct') {
					$(this).prop('contenteditable', false);
					$(this).addClass('td_marked');
					$(this).context.parentNode.cells[3].childNodes[1].style.display = "none";
					$(this).context.parentNode.cells[3].childNodes[3].style.display = "inline-block";
				}
				if ($(this).context.id === 'catg') {
					$(this).prop('contenteditable', false);
					$(this).addClass('td_marked');
					$(this).context.parentNode.cells[1].childNodes[1].style.display = "none";
					$(this).context.parentNode.cells[1].childNodes[3].style.display = "inline-block";
				}
			}
				});

		$('button[name="edit_income"]').on('click', function() { 
            var currentTD = $(this).closest('tr').find('td').not(':nth-child(8), :nth-child(7), :nth-child(9)');
			$('tr').removeClass('marked'); 
			$("td").removeClass('td_marked');
			$.each(currentTD, function () {
	                      $(this).prop('contenteditable', true)
						  $(this).addClass('td_marked');
	                  });
			$(this).closest('tr').find('td:first-child').click(function() {
				$('tr').find('td:first-child').prop('contenteditable', false);
				$(this).closest('tr').find('td:first-child').context.firstElementChild.type = 'date';
				$(this).closest('tr').find('td:first-child').context.lastElementChild.style.display = 'none';
				});
				$(this)[0].parentNode.children[0].style.display='none';
				$(this)[0].parentNode.children[1].style.display='inline-block';
				$(this)[0].parentNode.children[1].contentEditable = false;
			});
		
		$('button[name="save_income"]').click(function(e){
			e.preventDefault();
			var data = {}
			var all_tds = $(this).closest('tr').find('td');
			var xhttp = new XMLHttpRequest();
            var currentTD = $(this).closest('tr').find('td').not(':nth-child(8), :nth-child(7), :nth-child(9)');
			$.each(currentTD, function () {
                 		$(this).prop('contenteditable', false)
				  		$(this).removeClass('td_marked');
			
								});
			$(this)[0].parentNode.children[1].style.display='none';
			$(this)[0].parentNode.children[0].style.display='inline-block';
			$(this)[0].parentNode.children[0].contentEditable = false;
			xhttp.onreadystatechange = function () {
				
				if (xhttp.readyState == XMLHttpRequest.DONE) {
					if (xhttp.status == 200) {
						$(".alert").fadeTo(2000, 500).slideUp(500, function() {
							      $(".alert").slideUp(500);
							    });
							all_tds[3].children[1].style.display = 'none';
							all_tds[3].children[0].style.display = 'block';
							all_tds[3].children[0].value = all_tds[3].children[1].value;
							all_tds[3].children[0].textContent = all_tds[3].children[1].value;
							
					}
				}
			}
			if (all_tds[3].children[1].value){
				var account = all_tds[3].children[1].value;
			} else {
				var account = all_tds[3].children[0].textContent;
			}
			if (all_tds[1].children[1].value){
				var category = all_tds[1].children[1].value;
			} else {
				var category = all_tds[1].children[0].textContent;
			}
			var data = {
				'date': $(this).closest('tr').find('td')[0].firstElementChild.value,
				'category':category,
				'description':all_tds[2].textContent,
				'account':account,
				'amount': all_tds[4].textContent,
				'inc_id':this.value
			}
			var url = "/my_incomes";
			xhttp.open('PATCH', url, true);
			xhttp.setRequestHeader('Content-type', 'application/json');
			data = JSON.stringify(data);
			xhttp.send(data);
		});
	});
});
