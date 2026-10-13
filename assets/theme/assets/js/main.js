/**
 * Spirit Team — фронтенд без зависимостей.
 */
(function () {
	'use strict';

	var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	document.addEventListener('DOMContentLoaded', function () {

		/* Мобильное меню */
		var burger = document.getElementById('st-burger');
		var nav = document.getElementById('st-nav');

		if (burger && nav) {
			burger.addEventListener('click', function () {
				var open = nav.classList.toggle('st-open');
				burger.classList.toggle('st-open', open);
				burger.setAttribute('aria-expanded', open ? 'true' : 'false');
				document.body.style.overflow = open ? 'hidden' : '';
			});

			nav.addEventListener('click', function (e) {
				if (e.target.closest('a')) {
					nav.classList.remove('st-open');
					burger.classList.remove('st-open');
					burger.setAttribute('aria-expanded', 'false');
					document.body.style.overflow = '';
				}
			});

			document.addEventListener('keydown', function (e) {
				if ('Escape' === e.key && nav.classList.contains('st-open')) {
					burger.click();
				}
			});
		}

		/* FAQ */
		document.querySelectorAll('.st-faq__b').forEach(function (btn) {
			btn.addEventListener('click', function () {
				var item = btn.closest('.st-faq__i');
				var panel = item.querySelector('.st-faq__p');
				var open = item.classList.toggle('st-open');

				btn.setAttribute('aria-expanded', open ? 'true' : 'false');
				btn.querySelector('span:last-child').textContent = open ? '–' : '+';
				panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '';
			});
		});

		/* Появление блоков */
		var revs = document.querySelectorAll('.st-rev');

		if (reduced || !('IntersectionObserver' in window)) {
			revs.forEach(function (el) {
				el.classList.add('st-in');
			});
		} else {
			var io = new IntersectionObserver(function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						entry.target.classList.add('st-in');
						io.unobserve(entry.target);
					}
				});
			}, { rootMargin: '0px 0px -50px 0px', threshold: 0.05 });

			revs.forEach(function (el) {
				io.observe(el);
			});
		}

		/* Активный пункт меню */
		var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
		var links = Array.prototype.slice.call(document.querySelectorAll('.st-nav a[href*="#"]'));

		if (sections.length && links.length && 'IntersectionObserver' in window) {
			var spy = new IntersectionObserver(function (entries) {
				entries.forEach(function (entry) {
					if (!entry.isIntersecting) {
						return;
					}

					links.forEach(function (link) {
						if (link.parentElement) {
							link.parentElement.classList.toggle('st-on', link.hash === '#' + entry.target.id);
						}
					});
				});
			}, { rootMargin: '-45% 0px -50% 0px' });

			sections.forEach(function (section) {
				spy.observe(section);
			});
		}
	});
})();
