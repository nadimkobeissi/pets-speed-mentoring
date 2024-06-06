var colours = new Array("#93f", "#3f9", "#f39", "#39f", "#9f3"); // what colour are the blobs
var speed = 30; // speed of animation, lower is faster
var blobs = 3; // how many blobs are in the jar
var size = 80; // maximum blob size

/***************************\
*   Blobs in a Jar Effect   *
*(c)2012-20 mf2fm web-design*
*  http://www.mf2fm.com/rv  *
* DON'T EDIT BELOW THIS BOX *
\***************************/

var div;
var xpos = new Array();
var ypos = new Array();
var zpos = new Array();
var dx = new Array();
var dy = new Array();
var dz = new Array();
var blob = new Array();
var swide = 800;
var sleft = 0;
var shigh = 600;
var sdown = 0;
var x = 400;
var y = 300;

function addLoadEvent(funky) {
	var oldonload = window.onload;
	if (typeof (oldonload) != 'function') window.onload = funky;
	else window.onload = function () {
		if (oldonload) oldonload();
		funky();
	}
}

addLoadEvent(fill_the_jar);

function fill_the_jar() {
	var i, dvs;
	div = document.createElement('div');
	dvs = div.style;
	dvs.position = 'fixed';
	dvs.left = '0px';
	dvs.top = '0px';
	dvs.width = '1px';
	dvs.height = '1px';
	document.body.appendChild(div);
	set_scroll();
	set_width();
	for (i = 0; i < blobs; i++) {
		add_blob(i);
		jamjar(i);
	}
}

function add_blob(ref) {
	var dv, sy;
	dv = document.createElement('div');
	sy = dv.style;
	sy.width = size / 2 + "px";
	sy.height = size / 2 + "px";
	sy.borderRadius = "50%";
	sy.position = 'absolute';
	sy.backgroundColor = colours[ref % colours.length];
	do {
		ypos[ref] = Math.floor(shigh * Math.random());
		xpos[ref] = Math.floor(swide * Math.random());
	}
	while (checkity(ref));
	zpos[ref] = Math.random() * size / 4;
	dy[ref] = (0.5 + Math.random()) * (Math.random() > .5 ? 2 : -2);
	dx[ref] = (0.5 + Math.random()) * (Math.random() > .5 ? 2 : -2);
	dz[ref] = (0.5 + Math.random()) * (Math.random() > .5 ? .2 : -.2);
	blob[ref] = dv;
	div.appendChild(blob[ref]);
	set_blob(ref);
}

function checkity(j) {
	var i, r = false;
	if (j)
		for (var i = 0; i < j; i++) {
			if (Math.abs(xpos[i] - xpos[j]) < size && Math.abs(ypos[i] - ypos[j]) < size) r = true;
		}
	return (r);
}

function rejig(ref, xy) {
	if (xy == 'y') {
		dx[ref] = (0.5 + Math.random()) * sign(dx[ref]);
		dy[ref] = (0.5 + Math.random()) * -sign(dy[ref]);
	} else {
		dx[ref] = (0.5 + Math.random()) * -sign(dx[ref]);
		dy[ref] = (0.5 + Math.random()) * sign(dy[ref]);
	}
}

function sign(a) {
	if (a < 0) return (-2);
	else if (a > 0) return (2);
	else return (0);
}

function set_blob(ref) {
	var sy;
	sy = blob[ref].style;
	sy.top = ypos[ref] - size / 4 + 'px';
	sy.left = xpos[ref] - size / 4 + 'px';
	sy.filter = 'blur(' + zpos[ref] + 'px)';
}

function jamjar(ref) {
	var i;
	if (ypos[ref] + dy[ref] < -size / 2 || ypos[ref] + dy[ref] > shigh + size / 2) rejig(ref, 'y');
	else if (xpos[ref] + dx[ref] < -size / 2 || xpos[ref] + dx[ref] > swide + size / 2) rejig(ref, 'x');
	else if (Math.abs(ypos[ref] + dy[ref] - y) < size / 2 && Math.abs(xpos[ref] + dx[ref] - x) < size / 2 && zpos[ref] < size / 20) {
		if (Math.abs(ypos[ref] + dy[ref] - y) > Math.abs(xpos[ref] + dx[ref] - x)) dy[ref] = -dy[ref];
		else dx[ref] = -dx[ref];
	} else
		for (i = 0; i < blobs; i++) {
			if (i == ref) continue;
			if (Math.abs(ypos[ref] + dy[ref] - ypos[i]) < size / 2 && Math.abs(xpos[ref] + dx[ref] - xpos[i]) < size / 2 && Math.abs(zpos[ref] - zpos[i]) < size / 20) {
				if (Math.abs(ypos[ref] + dy[ref] - ypos[i]) > Math.abs(xpos[ref] + dx[ref] - xpos[i])) dy[ref] = -dy[ref];
				else dx[ref] = -dx[ref];
			}
		}
	ypos[ref] += dy[ref];
	xpos[ref] += dx[ref];
	if (zpos[ref] + dz[ref] < 0) dz[ref] = Math.abs(dz[ref]);
	else if (zpos[ref] + dz[ref] > size / 4) dz[ref] = -Math.abs(dz[ref]);
	zpos[ref] += dz[ref];
	set_blob(ref);
	setTimeout("jamjar(" + ref + ")", speed);
}

document.onmousemove = mouse;

function mouse(e) {
	if (e) {
		y = e.pageY;
		x = e.pageX;
	} else {
		set_scroll();
		y = event.y + sdown;
		x = event.x + sleft;
	}
}

document.onscroll = set_scroll;

function set_scroll() {
	if (typeof (self.pageYOffset) == "number") {
		sdown = self.pageYOffset;
		sleft = self.pageXOffset;
	} else if (document.body.scrollTop || document.body.scrollLeft) {
		sdown = document.body.scrollTop;
		sleft = document.body.scrollLeft;
	} else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
		sleft = document.documentElement.scrollLeft;
		sdown = document.documentElement.scrollTop;
	} else {
		sdown = 0;
		sleft = 0;
	}
}

window.onresize = set_width;

function set_width() {
	var sw_min = 999999;
	var sh_min = 999999;
	if (document.documentElement && document.documentElement.clientWidth) {
		if (document.documentElement.clientWidth > 0) sw_min = document.documentElement.clientWidth;
		if (document.documentElement.clientHeight > 0) sh_min = document.documentElement.clientHeight;
	}
	if (typeof (self.innerWidth) != "undefined" && self.innerWidth) {
		if (self.innerWidth > 0 && self.innerWidth < sw_min) sw_min = self.innerWidth;
		if (self.innerHeight > 0 && self.innerHeight < sh_min) sh_min = self.innerHeight;
	}
	if (document.body.clientWidth) {
		if (document.body.clientWidth > 0 && document.body.clientWidth < sw_min) sw_min = document.body.clientWidth;
		if (document.body.clientHeight > 0 && document.body.clientHeight < sh_min) sh_min = document.body.clientHeight;
	}
	if (sw_min == 999999 || sh_min == 999999) {
		sw_min = 800;
		sh_min = 600;
	}
	swide = sw_min;
	shigh = sh_min;
}