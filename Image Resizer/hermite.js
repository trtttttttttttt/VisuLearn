function Hermite_class() {
    var w, p, _ = [];
    this.init = void (w = navigator.hardwareConcurrency || 4),
    this.getCores = function() {
        return w
    }
    ,
    this.resample_auto = function(t, a, e, r, h) {
        var i = this.getCores();
        window.Worker && 1 < i ? this.resample(t, a, e, r, h) : (this.resample_single(t, a, e, !0),
        null != h && h())
    }
    ,
    this.resize_image = function(t, a, e, r, h) {
        var i = document.getElementById(t)
          , n = document.createElement("canvas");
        if (n.width = i.width,
        n.height = i.height,
        n.getContext("2d").drawImage(i, 0, 0),
        null == a && null == e && null != r && (a = i.width / 100 * r,
        e = i.height / 100 * r),
        null == e) {
            var o = i.width / a;
            e = i.height / o
        }
        a = Math.round(a),
        e = Math.round(e);
        var l = function() {
            var t = n.toDataURL();
            i.width = a,
            i.height = e,
            i.src = t,
            n = t = null
        };
        null == h || 1 == h ? this.resample(n, a, e, !0, l) : (this.resample_single(n, a, e, !0),
        l())
    }
    ,
    this.resample = function(t, r, a, e, h) {
        var i = t.width
          , n = t.height;
        r = Math.round(r);
        var o = n / (a = Math.round(a));
        if (0 < _.length)
            for (var l = 0; l < w; l++)
                null != _[l] && (_[l].terminate(),
                delete _[l]);
        _ = new Array(w);
        var s = t.getContext("2d")
          , c = []
          , g = 2 * Math.ceil(n / w / 2)
          , d = -1;
        for (l = 0; l < w; l++) {
            var u = d + 1;
            if (!(n <= u)) {
                d = u + g - 1,
                d = Math.min(d, n - 1);
                var f;
                f = Math.min(g, n - u),
                c[l] = {},
                c[l].source = s.getImageData(0, u, i, g),
                c[l].target = !0,
                c[l].start_y = Math.ceil(u / o),
                c[l].height = f
            }
        }
        !0 === e ? (t.width = r,
        t.height = a) : s.clearRect(0, 0, i, n);
        var M = 0;
        for (l = 0; l < w; l++)
            if (null != c[l]) {
                M++;
                var v = new Worker(p);
                (_[l] = v).onmessage = function(t) {
                    M--;
                    var a = t.data.core;
                    _[a].terminate(),
                    delete _[a];
                    var e = Math.ceil(c[a].height / o);
                    c[a].target = s.createImageData(r, e),
                    c[a].target.data.set(t.data.target),
                    s.putImageData(c[a].target, 0, c[a].start_y),
                    M <= 0 && null != h && h()
                }
                ;
                var m = {
                    width_source: i,
                    height_source: c[l].height,
                    width: r,
                    height: Math.ceil(c[l].height / o),
                    core: l,
                    source: c[l].source.data.buffer
                };
                v.postMessage(m, [m.source])
            }
    }
    ,
    p = window.URL.createObjectURL(new Blob(["(", function() {
        onmessage = function(t) {
            for (var a = t.data.core, e = t.data.width_source, r = t.data.height_source, h = t.data.width, i = t.data.height, n = e / h, o = r / i, l = Math.ceil(n / 2), s = Math.ceil(o / 2), c = new Uint8ClampedArray(t.data.source), g = (c.length,
            h * i * 4), d = new ArrayBuffer(g), u = new Uint8ClampedArray(d,0,g), f = 0; f < i; f++)
                for (var M = 0; M < h; M++) {
                    var v = 4 * (M + f * h)
                      , m = 0
                      , w = 0
                      , p = 0
                      , _ = 0
                      , y = 0
                      , b = 0
                      , C = 0
                      , I = f * o
                      , D = Math.floor(M * n)
                      , R = Math.ceil((M + 1) * n)
                      , U = Math.floor(f * o)
                      , A = Math.ceil((f + 1) * o);
                    R = Math.min(R, e),
                    A = Math.min(A, r);
                    for (var x = U; x < A; x++)
                        for (var B = Math.abs(I - x) / s, L = M * n, j = B * B, k = D; k < R; k++) {
                            var q = Math.abs(L - k) / l
                              , E = Math.sqrt(j + q * q);
                            if (!(1 <= E)) {
                                var W = 4 * (k + x * e);
                                C += (m = 2 * E * E * E - 3 * E * E + 1) * c[W + 3],
                                p += m,
                                c[W + 3] < 255 && (m = m * c[W + 3] / 250),
                                _ += m * c[W],
                                y += m * c[W + 1],
                                b += m * c[W + 2],
                                w += m
                            }
                        }
                    u[v] = _ / w,
                    u[v + 1] = y / w,
                    u[v + 2] = b / w,
                    u[v + 3] = C / p
                }
            postMessage({
                core: a,
                target: u
            }, [u.buffer])
        }
    }
    .toString(), ")()"],{
        type: "application/javascript"
    })),
    this.resample_single = function(t, a, e, r) {
        for (var h = t.width, i = t.height, n = h / (a = Math.round(a)), o = i / (e = Math.round(e)), l = Math.ceil(n / 2), s = Math.ceil(o / 2), c = t.getContext("2d"), g = c.getImageData(0, 0, h, i), d = c.createImageData(a, e), u = g.data, f = d.data, M = 0; M < e; M++)
            for (var v = 0; v < a; v++) {
                var m = 4 * (v + M * a)
                  , w = 0
                  , p = 0
                  , _ = 0
                  , y = 0
                  , b = 0
                  , C = 0
                  , I = 0
                  , D = M * o
                  , R = Math.floor(v * n)
                  , U = Math.ceil((v + 1) * n)
                  , A = Math.floor(M * o)
                  , x = Math.ceil((M + 1) * o);
                U = Math.min(U, h),
                x = Math.min(x, i);
                for (var B = A; B < x; B++)
                    for (var L = Math.abs(D - B) / s, j = v * n, k = L * L, q = R; q < U; q++) {
                        var E = Math.abs(j - q) / l
                          , W = Math.sqrt(k + E * E);
                        if (!(1 <= W)) {
                            var z = 4 * (q + B * h);
                            I += (w = 2 * W * W * W - 3 * W * W + 1) * u[z + 3],
                            _ += w,
                            u[z + 3] < 255 && (w = w * u[z + 3] / 250),
                            y += w * u[z],
                            b += w * u[z + 1],
                            C += w * u[z + 2],
                            p += w
                        }
                    }
                f[m] = y / p,
                f[m + 1] = b / p,
                f[m + 2] = C / p,
                f[m + 3] = I / _
            }
        !0 === r ? (t.width = a,
        t.height = e) : c.clearRect(0, 0, h, i),
        c.putImageData(d, 0, 0)
    }
}
