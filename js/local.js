var util = (function () {
  var i, l, bad, map, trim, obj;

  bad = /\u0003/g;
  map = [
    { key: '\u0026', hex: '&#38;',   entity: '&amp;' },
    { key: '\u00A0', hex: '&#160;',  entity: '&nbsp;' },
    { key: '\u00A1', hex: '&#161;',  entity: '&iexcl;' },
    { key: '\u00A2', hex: '&#162;',  entity: '&cent;' },
    { key: '\u00A3', hex: '&#163;',  entity: '&pound;' },
    { key: '\u00A4', hex: '&#164;',  entity: '&curren;' },
    { key: '\u00A5', hex: '&#165;',  entity: '&yen;' },
    { key: '\u00A6', hex: '&#166;',  entity: '&brvbar;' },
    { key: '\u00A7', hex: '&#167;',  entity: '&sect;' },
    { key: '\u00A8', hex: '&#168;',  entity: '&uml;' },
    { key: '\u00A9', hex: '&#169;',  entity: '&copy;' },
    { key: '\u00AA', hex: '&#170;',  entity: '&ordf;' },
    { key: '\u00AB', hex: '&#171;',  entity: '&laquo;' },
    { key: '\u00AC', hex: '&#172;',  entity: '&not;' },
    { key: '\u00AD', hex: '&#173;',  entity: '&shy;' },
    { key: '\u00AE', hex: '&#174;',  entity: '&reg;' },
    { key: '\u00AF', hex: '&#175;',  entity: '&macr;' },
    { key: '\u00B0', hex: '&#176;',  entity: '&deg;' },
    { key: '\u00B1', hex: '&#177;',  entity: '&plusmn;' },
    { key: '\u00B2', hex: '&#178;',  entity: '&sup2;' },
    { key: '\u00B3', hex: '&#179;',  entity: '&sup3;' },
    { key: '\u00B4', hex: '&#180;',  entity: '&acute;' },
    { key: '\u00B5', hex: '&#181;',  entity: '&micro;' },
    { key: '\u00B6', hex: '&#182;',  entity: '&para;' },
    { key: '\u00B7', hex: '&#183;',  entity: '&middot;' },
    { key: '\u00B8', hex: '&#184;',  entity: '&cedil;' },
    { key: '\u00B9', hex: '&#185;',  entity: '&sup1;' },
    { key: '\u00BA', hex: '&#186;',  entity: '&ordm;' },
    { key: '\u00BB', hex: '&#187;',  entity: '&raquo;' },
    { key: '\u00BC', hex: '&#188;',  entity: '&frac14;' },
    { key: '\u00BD', hex: '&#189;',  entity: '&frac12;' },
    { key: '\u00BE', hex: '&#190;',  entity: '&frac34;' },
    { key: '\u00BF', hex: '&#191;',  entity: '&iquest;' },
    { key: '\u00C0', hex: '&#192;',  entity: '&Agrave;' },
    { key: '\u00C1', hex: '&#193;',  entity: '&Aacute;' },
    { key: '\u00C2', hex: '&#194;',  entity: '&Acirc;' },
    { key: '\u00C3', hex: '&#195;',  entity: '&Atilde;' },
    { key: '\u00C4', hex: '&#196;',  entity: '&Auml;' },
    { key: '\u00C5', hex: '&#197;',  entity: '&Aring;' },
    { key: '\u00C6', hex: '&#198;',  entity: '&AElig;' },
    { key: '\u00C7', hex: '&#199;',  entity: '&Ccedil;' },
    { key: '\u00C8', hex: '&#200;',  entity: '&Egrave;' },
    { key: '\u00C9', hex: '&#201;',  entity: '&Eacute;' },
    { key: '\u00CA', hex: '&#202;',  entity: '&Ecirc;' },
    { key: '\u00CB', hex: '&#203;',  entity: '&Euml;' },
    { key: '\u00CC', hex: '&#204;',  entity: '&Igrave;' },
    { key: '\u00CD', hex: '&#205;',  entity: '&Iacute;' },
    { key: '\u00CE', hex: '&#206;',  entity: '&Icirc;' },
    { key: '\u00CF', hex: '&#207;',  entity: '&Iuml;' },
    { key: '\u00D0', hex: '&#208;',  entity: '&ETH;' },
    { key: '\u00D1', hex: '&#209;',  entity: '&Ntilde;' },
    { key: '\u00D2', hex: '&#210;',  entity: '&Ograve;' },
    { key: '\u00D3', hex: '&#211;',  entity: '&Oacute;' },
    { key: '\u00D4', hex: '&#212;',  entity: '&Ocirc;' },
    { key: '\u00D5', hex: '&#213;',  entity: '&Otilde;' },
    { key: '\u00D6', hex: '&#214;',  entity: '&Ouml;' },
    { key: '\u00D7', hex: '&#215;',  entity: '&times;' },
    { key: '\u00D8', hex: '&#216;',  entity: '&Oslash;' },
    { key: '\u00D9', hex: '&#217;',  entity: '&Ugrave;' },
    { key: '\u00DA', hex: '&#218;',  entity: '&Uacute;' },
    { key: '\u00DB', hex: '&#219;',  entity: '&Ucirc;' },
    { key: '\u00DC', hex: '&#220;',  entity: '&Uuml;' },
    { key: '\u00DD', hex: '&#221;',  entity: '&Yacute;' },
    { key: '\u00DE', hex: '&#222;',  entity: '&THORN;' },
    { key: '\u00DF', hex: '&#223;',  entity: '&szlig;' },
    { key: '\u00E0', hex: '&#224;',  entity: '&agrave;' },
    { key: '\u00E1', hex: '&#225;',  entity: '&aacute;' },
    { key: '\u00E2', hex: '&#226;',  entity: '&acirc;' },
    { key: '\u00E3', hex: '&#227;',  entity: '&atilde;' },
    { key: '\u00E4', hex: '&#228;',  entity: '&auml;' },
    { key: '\u00E5', hex: '&#229;',  entity: '&aring;' },
    { key: '\u00E6', hex: '&#230;',  entity: '&aelig;' },
    { key: '\u00E7', hex: '&#231;',  entity: '&ccedil;' },
    { key: '\u00E8', hex: '&#232;',  entity: '&egrave;' },
    { key: '\u00E9', hex: '&#233;',  entity: '&eacute;' },
    { key: '\u00EA', hex: '&#234;',  entity: '&ecirc;' },
    { key: '\u00EB', hex: '&#235;',  entity: '&euml;' },
    { key: '\u00EC', hex: '&#236;',  entity: '&igrave;' },
    { key: '\u00ED', hex: '&#237;',  entity: '&iacute;' },
    { key: '\u00EE', hex: '&#238;',  entity: '&icirc;' },
    { key: '\u00EF', hex: '&#239;',  entity: '&iuml;' },
    { key: '\u00F0', hex: '&#240;',  entity: '&eth;' },
    { key: '\u00F1', hex: '&#241;',  entity: '&ntilde;' },
    { key: '\u00F2', hex: '&#242;',  entity: '&ograve;' },
    { key: '\u00F3', hex: '&#243;',  entity: '&oacute;' },
    { key: '\u00F4', hex: '&#244;',  entity: '&ocirc;' },
    { key: '\u00F5', hex: '&#245;',  entity: '&otilde;' },
    { key: '\u00F6', hex: '&#246;',  entity: '&ouml;' },
    { key: '\u00F7', hex: '&#247;',  entity: '&divide;' },
    { key: '\u00F8', hex: '&#248;',  entity: '&oslash;' },
    { key: '\u00F9', hex: '&#249;',  entity: '&ugrave;' },
    { key: '\u00FA', hex: '&#250;',  entity: '&uacute;' },
    { key: '\u00FB', hex: '&#251;',  entity: '&ucirc;' },
    { key: '\u00FC', hex: '&#252;',  entity: '&uuml;' },
    { key: '\u00FD', hex: '&#253;',  entity: '&yacute;' },
    { key: '\u00FE', hex: '&#254;',  entity: '&thorn;' },
    { key: '\u00FF', hex: '&#255;',  entity: '&yuml;' },
    { key: '\u0192', hex: '&#402;',  entity: '&fnof;' },
    { key: '\u0391', hex: '&#913;',  entity: '&Alpha;' },
    { key: '\u0392', hex: '&#914;',  entity: '&Beta;' },
    { key: '\u0393', hex: '&#915;',  entity: '&Gamma;' },
    { key: '\u0394', hex: '&#916;',  entity: '&Delta;' },
    { key: '\u0395', hex: '&#917;',  entity: '&Epsilon;' },
    { key: '\u0396', hex: '&#918;',  entity: '&Zeta;' },
    { key: '\u0397', hex: '&#919;',  entity: '&Eta;' },
    { key: '\u0398', hex: '&#920;',  entity: '&Theta;' },
    { key: '\u0399', hex: '&#921;',  entity: '&Iota;' },
    { key: '\u039A', hex: '&#922;',  entity: '&Kappa;' },
    { key: '\u039B', hex: '&#923;',  entity: '&Lambda;' },
    { key: '\u039C', hex: '&#924;',  entity: '&Mu;' },
    { key: '\u039D', hex: '&#925;',  entity: '&Nu;' },
    { key: '\u039E', hex: '&#926;',  entity: '&Xi;' },
    { key: '\u039F', hex: '&#927;',  entity: '&Omicron;' },
    { key: '\u03A0', hex: '&#928;',  entity: '&Pi;' },
    { key: '\u03A1', hex: '&#929;',  entity: '&Rho;' },
    { key: '\u03A3', hex: '&#931;',  entity: '&Sigma;' },
    { key: '\u03A4', hex: '&#932;',  entity: '&Tau;' },
    { key: '\u03A5', hex: '&#933;',  entity: '&Upsilon;' },
    { key: '\u03A6', hex: '&#934;',  entity: '&Phi;' },
    { key: '\u03A7', hex: '&#935;',  entity: '&Chi;' },
    { key: '\u03A8', hex: '&#936;',  entity: '&Psi;' },
    { key: '\u03A9', hex: '&#937;',  entity: '&Omega;' },
    { key: '\u03B1', hex: '&#945;',  entity: '&alpha;' },
    { key: '\u03B2', hex: '&#946;',  entity: '&beta;' },
    { key: '\u03B3', hex: '&#947;',  entity: '&gamma;' },
    { key: '\u03B4', hex: '&#948;',  entity: '&delta;' },
    { key: '\u03B5', hex: '&#949;',  entity: '&epsilon;' },
    { key: '\u03B6', hex: '&#950;',  entity: '&zeta;' },
    { key: '\u03B7', hex: '&#951;',  entity: '&eta;' },
    { key: '\u03B8', hex: '&#952;',  entity: '&theta;' },
    { key: '\u03B9', hex: '&#953;',  entity: '&iota;' },
    { key: '\u03BA', hex: '&#954;',  entity: '&kappa;' },
    { key: '\u03BB', hex: '&#955;',  entity: '&lambda;' },
    { key: '\u03BC', hex: '&#956;',  entity: '&mu;' },
    { key: '\u03BD', hex: '&#957;',  entity: '&nu;' },
    { key: '\u03BE', hex: '&#958;',  entity: '&xi;' },
    { key: '\u03BF', hex: '&#959;',  entity: '&omicron;' },
    { key: '\u03C0', hex: '&#960;',  entity: '&pi;' },
    { key: '\u03C1', hex: '&#961;',  entity: '&rho;' },
    { key: '\u03C2', hex: '&#962;',  entity: '&sigmaf;' },
    { key: '\u03C3', hex: '&#963;',  entity: '&sigma;' },
    { key: '\u03C4', hex: '&#964;',  entity: '&tau;' },
    { key: '\u03C5', hex: '&#965;',  entity: '&upsilon;' },
    { key: '\u03C6', hex: '&#966;',  entity: '&phi;' },
    { key: '\u03C7', hex: '&#967;',  entity: '&chi;' },
    { key: '\u03C8', hex: '&#968;',  entity: '&psi;' },
    { key: '\u03C9', hex: '&#969;',  entity: '&omega;' },
    { key: '\u03D1', hex: '&#977;',  entity: '&thetasym;' },
    { key: '\u03D2', hex: '&#978;',  entity: '&upsih;' },
    { key: '\u03D6', hex: '&#982;',  entity: '&piv;' },
    { key: '\u2022', hex: '&#8226;', entity: '&bull;' },
    { key: '\u2026', hex: '&#8230;', entity: '&hellip;' },
    { key: '\u2032', hex: '&#8242;', entity: '&prime;' },
    { key: '\u2033', hex: '&#8243;', entity: '&Prime;' },
    { key: '\u203E', hex: '&#8254;', entity: '&oline;' },
    { key: '\u2044', hex: '&#8260;', entity: '&frasl;' },
    { key: '\u2118', hex: '&#8472;', entity: '&weierp;' },
    { key: '\u2111', hex: '&#8465;', entity: '&image;' },
    { key: '\u211C', hex: '&#8476;', entity: '&real;' },
    { key: '\u2122', hex: '&#8482;', entity: '&trade;' },
    { key: '\u2135', hex: '&#8501;', entity: '&alefsym;' },
    { key: '\u2190', hex: '&#8592;', entity: '&larr;' },
    { key: '\u2191', hex: '&#8593;', entity: '&uarr;' },
    { key: '\u2192', hex: '&#8594;', entity: '&rarr;' },
    { key: '\u2193', hex: '&#8595;', entity: '&darr;' },
    { key: '\u2194', hex: '&#8596;', entity: '&harr;' },
    { key: '\u21B5', hex: '&#8629;', entity: '&crarr;' },
    { key: '\u21D0', hex: '&#8656;', entity: '&lArr;' },
    { key: '\u21D1', hex: '&#8657;', entity: '&uArr;' },
    { key: '\u21D2', hex: '&#8658;', entity: '&rArr;' },
    { key: '\u21D3', hex: '&#8659;', entity: '&dArr;' },
    { key: '\u21D4', hex: '&#8660;', entity: '&hArr;' },
    { key: '\u2200', hex: '&#8704;', entity: '&forall;' },
    { key: '\u2202', hex: '&#8706;', entity: '&part;' },
    { key: '\u2203', hex: '&#8707;', entity: '&exist;' },
    { key: '\u2205', hex: '&#8709;', entity: '&empty;' },
    { key: '\u2207', hex: '&#8711;', entity: '&nabla;' },
    { key: '\u2208', hex: '&#8712;', entity: '&isin;' },
    { key: '\u2209', hex: '&#8713;', entity: '&notin;' },
    { key: '\u220B', hex: '&#8715;', entity: '&ni;' },
    { key: '\u220F', hex: '&#8719;', entity: '&prod;' },
    { key: '\u2211', hex: '&#8721;', entity: '&sum;' },
    { key: '\u2212', hex: '&#8722;', entity: '&minus;' },
    { key: '\u2217', hex: '&#8727;', entity: '&lowast;' },
    { key: '\u221A', hex: '&#8730;', entity: '&radic;' },
    { key: '\u221D', hex: '&#8733;', entity: '&prop;' },
    { key: '\u221E', hex: '&#8734;', entity: '&infin;' },
    { key: '\u2220', hex: '&#8736;', entity: '&ang;' },
    { key: '\u2227', hex: '&#8743;', entity: '&and;' },
    { key: '\u2228', hex: '&#8744;', entity: '&or;' },
    { key: '\u2229', hex: '&#8745;', entity: '&cap;' },
    { key: '\u222A', hex: '&#8746;', entity: '&cup;' },
    { key: '\u222B', hex: '&#8747;', entity: '&int;' },
    { key: '\u2234', hex: '&#8756;', entity: '&there4;' },
    { key: '\u223C', hex: '&#8764;', entity: '&sim;' },
    { key: '\u2245', hex: '&#8773;', entity: '&cong;' },
    { key: '\u2248', hex: '&#8776;', entity: '&asymp;' },
    { key: '\u2260', hex: '&#8800;', entity: '&ne;' },
    { key: '\u2261', hex: '&#8801;', entity: '&equiv;' },
    { key: '\u2264', hex: '&#8804;', entity: '&le;' },
    { key: '\u2265', hex: '&#8805;', entity: '&ge;' },
    { key: '\u2282', hex: '&#8834;', entity: '&sub;' },
    { key: '\u2283', hex: '&#8835;', entity: '&sup;' },
    { key: '\u2284', hex: '&#8836;', entity: '&nsub;' },
    { key: '\u2286', hex: '&#8838;', entity: '&sube;' },
    { key: '\u2287', hex: '&#8839;', entity: '&supe;' },
    { key: '\u2295', hex: '&#8853;', entity: '&oplus;' },
    { key: '\u2297', hex: '&#8855;', entity: '&otimes;' },
    { key: '\u22A5', hex: '&#8869;', entity: '&perp;' },
    { key: '\u22C5', hex: '&#8901;', entity: '&sdot;' },
    { key: '\u2308', hex: '&#8968;', entity: '&lceil;' },
    { key: '\u2309', hex: '&#8969;', entity: '&rceil;' },
    { key: '\u230A', hex: '&#8970;', entity: '&lfloor;' },
    { key: '\u230B', hex: '&#8971;', entity: '&rfloor;' },
    { key: '\u2329', hex: '&#9001;', entity: '&lang;' },
    { key: '\u232A', hex: '&#9002;', entity: '&rang;' },
    { key: '\u25CA', hex: '&#9674;', entity: '&loz;' },
    { key: '\u2660', hex: '&#9824;', entity: '&spades;' },
    { key: '\u2663', hex: '&#9827;', entity: '&clubs;' },
    { key: '\u2665', hex: '&#9829;', entity: '&hearts;' },
    { key: '\u2666', hex: '&#9830;', entity: '&diams;' },
    { key: '\u0022', hex: '&#34;',   entity: '&quot;' },
    { key: '\u003C', hex: '&#60;',   entity: '&lt;' },
    { key: '\u003E', hex: '&#62;',   entity: '&gt;' },
    { key: '\u0152', hex: '&#338;',  entity: '&OElig;' },
    { key: '\u0153', hex: '&#339;',  entity: '&oelig;' },
    { key: '\u0160', hex: '&#352;',  entity: '&Scaron;' },
    { key: '\u0161', hex: '&#353;',  entity: '&scaron;' },
    { key: '\u0178', hex: '&#376;',  entity: '&Yuml;' },
    { key: '\u02C6', hex: '&#710;',  entity: '&circ;' },
    { key: '\u02DC', hex: '&#732;',  entity: '&tilde;' },
    { key: '\u2002', hex: '&#8194;', entity: '&ensp;' },
    { key: '\u2003', hex: '&#8195;', entity: '&emsp;' },
    { key: '\u2009', hex: '&#8201;', entity: '&thinsp;' },
    { key: '\u200C', hex: '&#8204;', entity: '&zwnj;' },
    { key: '\u200D', hex: '&#8205;', entity: '&zwj;' },
    { key: '\u200E', hex: '&#8206;', entity: '&lrm;' },
    { key: '\u200F', hex: '&#8207;', entity: '&rlm;' },
    { key: '\u2013', hex: '&#8211;', entity: '&ndash;' },
    { key: '\u2014', hex: '&#8212;', entity: '&mdash;' },
    { key: '\u2018', hex: '&#8216;', entity: '&lsquo;' },
    { key: '\u2019', hex: '&#8217;', entity: '&rsquo;' },
    { key: '\u201A', hex: '&#8218;', entity: '&sbquo;' },
    { key: '\u201C', hex: '&#8220;', entity: '&ldquo;' },
    { key: '\u201D', hex: '&#8221;', entity: '&rdquo;' },
    { key: '\u201E', hex: '&#8222;', entity: '&bdquo;' },
    { key: '\u2020', hex: '&#8224;', entity: '&dagger;' },
    { key: '\u2021', hex: '&#8225;', entity: '&Dagger;' },
    { key: '\u2030', hex: '&#8240;', entity: '&permil;' },
    { key: '\u2039', hex: '&#8249;', entity: '&lsaquo;' },
    { key: '\u203A', hex: '&#8250;', entity: '&rsaquo;' },
    { key: '\u20AC', hex: '&#8364;', entity: '&euro;' }
  ];
  trim = /^\s*|\s*$/g;
  trim_inner = /[\s\r\n]+/g;
  options = 'g';

  /* Compile the regex */
  for (i=0, l=map.length; i<l; i++) {
    if (map[i].key && !map[i].regex) {
      map[i].regex = new RegExp(map[i].key, options);
    }
  }

  obj = {};
  obj.wrap = function (text, width) {
    var i, il, words, lines, line, length, word;

    words = text.split(/\s+/);
    lines = [];
    line = [];
    length = 0;

    while (words.length > 0) {
      word = words.shift();
      length += word.length;

      if (length > width) {
        lines.push(line);
        line = [];
        length = word.length;
      }

      line.push(word);
      length += 1;
    }
    lines.push(line);

    for (i=0, il=lines.length; i<il; i++) { lines[i] = lines[i].join(' '); }
    return lines.join('\r\n');
  };
  obj.encode = function (options) {
    var result, i, l;

    if (options             === undefined) { return undefined; }
    if (options.useEntities === undefined) { options.useEntities = true; }
    if (options.trim        === undefined) { options.trim = true; }
    if (options.text        === undefined) { return undefined; }
    if (options.wrap        === undefined) { options.wrap = 80; }

    result = options.text.replace(bad, '');
    for (i=0, l=map.length; i<l; i++) {
      result = result.replace(map[i].regex, options.useEntities ? map[i].entity : map[i].hex);
    }
    result = result.replace(trim, '');
    if (options.trim) { result = result.replace(trim_inner, ' '); }
    if (options.wrap > 0) { result = obj.wrap(result, options.wrap); }

    return result;
  };
  obj.makeList = function (options) {
    var result, i, l;

    if (options           === undefined) { return undefined; }
    if (options.separator === undefined) { options.separator = "[\i\r\\n]+"; }
    if (options.prefix    === undefined) { options.prefix = ""; }
    if (options.postfix   === undefined) { options.postfix = ""; }
    if (options.text      === undefined) { return undefined; }
    if (options.wrap      === undefined) { options.wrap = 80; }

    result = options.text.split(new RegExp(options.separator, 'g'));
    for (i=0, l=result.length; i<l; i++) {
      if (options.wrap > 0) { result[i] = obj.wrap(result[i], options.wrap); }
      result[i] = options.prefix + result[i].replace(trim, '') + options.postfix;
    }
    result = result.join('\r\n');;
    return result;
  };

  return obj;
}());

function execute (mode) {
  var isList, isMarkdown, result, text, html, wrap, converter;
  
  isList     = mode === "list" ? true : false;
  isMarkdown = mode === "markdown" ? true : false;
  text       = document.getElementById('text');
  html       = document.getElementById('html');
  wrap       = document.getElementById('wrap');
  wrap       = (wrap && wrap.value) ? parseInt(wrap.value, 10) : undefined;

  result = util.encode({
    text:        text.value,
    useEntities: document.getElementById('radioEntities').checked,
    trim:        !isList && !isMarkdown && document.getElementById('trim').checked,
    wrap:        isList || isMarkdown ? 0 : wrap
  });
  if (isMarkdown) {
    if (converter === undefined) { converter = new Markdown.getSanitizingConverter(); }
    result = converter.makeHtml(result);
  } else if (isList) {
    result = util.makeList({
      text:      result,
      separator: document.getElementById('separator').value,
      prefix:    document.getElementById('prefix').value,
      postfix:   document.getElementById('postfix').value,
      wrap:      wrap
    });
  }
  html.value = result;
  html.focus();
}
