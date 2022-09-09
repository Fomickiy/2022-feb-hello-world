window.addEventListener("DOMContentLoaded", () => {
	
	//** INIT AOS.JS START */
	AOS.init({
		once: true,
		disable: function () {
			var maxWidth = 992;
			return window.innerWidth < maxWidth;
		}   
	});
	//** INIT AOS.JS END */

	/** MOBILE MENU START */
	const burger = (burgerSelector, menuSelector, bodySelector) => {
		const burger = document.querySelector(burgerSelector),
  				menu = document.querySelector(menuSelector),
					body = document.querySelector(bodySelector);

		const toggleMenu = () => {
					burger.classList.toggle("active");
					menu.classList.toggle("active");
					if(menu.classList.contains('active')) {
						body.style.overflow = 'hidden';
					} else {
						body.style.overflow = '';
					}
		};

		burger.addEventListener("click", (e) => {
			e.stopPropagation();

			toggleMenu();
		});

		document.addEventListener("click", (e) => {
			let target = e.target;
			let itsMenu = target == menu || menu.contains(target);
			let itsBurger = target == burger;
			let activeMenu = menu.classList.contains("active");
	
			if (!itsMenu && !itsBurger && activeMenu) {
				toggleMenu();
			}
		});
		window.addEventListener('resize', () => {
			if(window.screen.availWidth > 992) {
				menu.classList.remove("active");
				burger.classList.remove("active");
			}
		});
	};
	//call function burger
	burger('.burger', '.menu-mob', 'html, body');
	/** MOBILE MENU END */

	$(window).scroll(function() {
		var $button = $('.pageup');
				if($(window).scrollTop() + $(window).height() < $(document).height() - $(".footer").height()) {
					$button.css("position","fixed");    //resetting it
					$button.css("bottom","100px"); //resetting it
				}
				if($(window).scrollTop() + $(window).height() - 100 > $(document).height() - $(".footer").height()) {
					
					let heightFooter = $(".footer").height();
				$button.css("position","absolute"); // make it related
				$button.css("bottom", $(window).scrollTop() - $(window).height() + heightFooter); 
				}
			});


 $(function () {
		// при нажатии на кнопку scrollup
		$('.pageup').click(function () {
			// переместиться в верхнюю часть страницы
			$("html, body").animate({
				scrollTop: 0
			}, 1000);
		})
	});
	// при прокрутке окна (window)
	$(window).scroll(function () {
		// если пользователь прокрутил страницу более чем на 200px
		if ($(this).scrollTop() > 500) {
			// то сделать кнопку scrollup видимой
			$('.pageup').fadeIn();
		}
		// иначе скрыть кнопку scrollup
		else {
			$('.pageup').fadeOut();
		}
 	});

  /** ALL SLIDERS START */
  $(document).ready(function () {
    $(".js-slider-direction").slick({
      dots: true,
      slidesToShow: 1,
      infinite: true,
    });
    $(".js-slider-advantage").slick({
      dots: true,
      slidesToShow: 1,
      infinite: true,
    });
    $(".js-slider-problems").slick({
      dots: true,
      slidesToShow: 2,
      infinite: true,

      responsive: [
        {
          breakpoint: 991.98,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
    $(".js-slider-partners").slick({
      dots: true,
      slidesToShow: 4,
      infinite: true,
      responsive: [
        {
          breakpoint: 991.98,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 767.98,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 575.98,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
    $(".js-slider-roadmap").slick({
      dots: true,
      slidesToShow: 3,
      infinite: true,
      responsive: [
        {
          breakpoint: 1099.98,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 767.98,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
    $(".js-slider-achievements").slick({
      dots: true,
      slidesToShow: 1,
      infinite: true
    });
    $('.js-slider-comand').slick({
      dots: true,
      slidesToShow: 4,
      infinite: true,
      responsive: [
        {
          breakpoint: 1499.98,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 899.98,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 575.98,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
  });
	/** ALL SLIDERS END */

 /** CUSTOM SELECT START */
	$(function($){
		$.fn.customSelect = function(params){
			var defaults = {
				selectClass: 'custom-select',
				openClass: 'open',
				activeClass: 'active',
				selectElement: '<div></div>',
				selectOpsContainer: '<ul></ul>',
				selectOpElement: '<li></li>'
			};
	
			var options = $.extend(defaults, params),
					$element = this,
					select = $(options.selectElement).addClass(options.selectClass).addClass($element.attr('class')).insertAfter($element),
					selectInput = $('<input type="text" readonly />').attr('name', $element.attr('name')).attr('id', $element.attr('id')).appendTo(select),
					selectOps = $(options.selectOpsContainer).appendTo(select),
					active;
	
			$element.children().each(function(){
				var $this = $(this),
						newOption;
				newOption = $(options.selectOpElement).text($this.text()).appendTo(selectOps).on('click', function(){
					active = $(this);
					changeActive();
					select.removeClass(options.openClass);
				});
				if($this.attr('data-href')){
					newOption.attr('href', $this.attr('data-href'));
				}
				if($this.attr('selected')){
					active = newOption;
					changeActive();
				}
			});
	
			selectInput.on('keydown', function(e){
				var keycode = e.keyCode;
				if(keycode === 40){
					nextOp();
					return false;
				} else if(keycode === 38){
					prevOp();
					return false;
				}
			});
	
			function nextOp(){
				if(active.next().length > 0){
					active = active.next();
					changeActive();
				}
			}
	
			function prevOp(){
				if(active.prev().length > 0){
					active = active.prev();
					changeActive();
				}
			}
	
			function changeActive(){
				if(active){
					selectOps.children().removeClass(options.activeClass);
					active.addClass(options.activeClass);
					scrollSelect();
					changeText();
				}
			}
	
			function scrollSelect(){
				selectOps.scrollTop(selectOps.scrollTop() + active.position().top);
			}
			
			function changeText(){
				selectInput.val(active.text());
			}
	
			selectInput.on('focus', function(){
				select.addClass(options.openClass);
			});
			
			selectInput.on('blur', function(){
				if(!selectOps.is(':hover')){
					select.removeClass(options.openClass);
				}
			});
	
			$element.remove();
		};   
	}(jQuery));
	
	$('select').each(function(){
		$(this).customSelect();
	});
/** CUSTOM SELECT END */


});

