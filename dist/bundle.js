(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Main = function () {
  function Main() {
    var _this = this;

    _classCallCheck(this, Main);

    if (window.mobilecheck()) {
      document.getElementById("mobile-warning").hidden = false;
    }

    this.fileSelect = document.getElementById("file-select");

    // Initialize model selection
    this.modelSelectStyle = document.getElementById("model-select-style");
    this.modelSelectStyle.onchange = function (evt) {
      if (evt.target.value === "mobilenet") {
        _this.disableStylizeButtons();
        _this.loadMobileNetStyleModel().then(function (model) {
          _this.styleNet = model;
        }).finally(function () {
          return _this.enableStylizeButtons();
        });
      } else if (evt.target.value === "inception") {
        _this.disableStylizeButtons();
        _this.loadInceptionStyleModel().then(function (model) {
          _this.styleNet = model;
        }).finally(function () {
          return _this.enableStylizeButtons();
        });
      }
    };

    this.modelSelectTransformer = document.getElementById("model-select-transformer");
    this.modelSelectTransformer.onchange = function (evt) {
      if (evt.target.value === "original") {
        _this.disableStylizeButtons();
        _this.loadOriginalTransformerModel().then(function (model) {
          _this.transformNet = model;
        }).finally(function () {
          return _this.enableStylizeButtons();
        });
      } else if (evt.target.value === "separable") {
        _this.disableStylizeButtons();
        _this.loadSeparableTransformerModel().then(function (model) {
          _this.transformNet = model;
        }).finally(function () {
          return _this.enableStylizeButtons();
        });
      }
    };

    this.initalizeWebcamVariables();
    this.initializeStyleTransfer();
    this.initializeCombineStyles();

    Promise.all([this.loadMobileNetStyleModel(), this.loadSeparableTransformerModel()]).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          styleNet = _ref2[0],
          transformNet = _ref2[1];

      console.log("Loaded styleNet");
      _this.styleNet = styleNet;
      _this.transformNet = transformNet;
      _this.enableStylizeButtons();
    });
  }

  _createClass(Main, [{
    key: "loadMobileNetStyleModel",
    value: function loadMobileNetStyleModel() {
      return regeneratorRuntime.async(function loadMobileNetStyleModel$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (this.mobileStyleNet) {
                _context.next = 4;
                break;
              }

              _context.next = 3;
              return regeneratorRuntime.awrap(tf.loadGraphModel("saved_model_style_js/model.json"));

            case 3:
              this.mobileStyleNet = _context.sent;

            case 4:
              return _context.abrupt("return", this.mobileStyleNet);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "loadInceptionStyleModel",
    value: function loadInceptionStyleModel() {
      return regeneratorRuntime.async(function loadInceptionStyleModel$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (this.inceptionStyleNet) {
                _context2.next = 4;
                break;
              }

              _context2.next = 3;
              return regeneratorRuntime.awrap(tf.loadGraphModel("saved_model_style_inception_js/model.json"));

            case 3:
              this.inceptionStyleNet = _context2.sent;

            case 4:
              return _context2.abrupt("return", this.inceptionStyleNet);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "loadOriginalTransformerModel",
    value: function loadOriginalTransformerModel() {
      return regeneratorRuntime.async(function loadOriginalTransformerModel$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (this.originalTransformNet) {
                _context3.next = 4;
                break;
              }

              _context3.next = 3;
              return regeneratorRuntime.awrap(tf.loadGraphModel("saved_model_transformer_js/model.json"));

            case 3:
              this.originalTransformNet = _context3.sent;

            case 4:
              return _context3.abrupt("return", this.originalTransformNet);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "loadSeparableTransformerModel",
    value: function loadSeparableTransformerModel() {
      return regeneratorRuntime.async(function loadSeparableTransformerModel$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (this.separableTransformNet) {
                _context4.next = 4;
                break;
              }

              _context4.next = 3;
              return regeneratorRuntime.awrap(tf.loadGraphModel("saved_model_transformer_separable_js/model.json"));

            case 3:
              this.separableTransformNet = _context4.sent;

            case 4:
              return _context4.abrupt("return", this.separableTransformNet);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "initalizeWebcamVariables",
    value: function initalizeWebcamVariables() {
      var _this2 = this;

      this.camModal = $("#cam-modal");

      this.snapButton = document.getElementById("snap-button");
      this.webcamVideoElement = document.getElementById("webcam-video");

      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

      this.camModal.on("hidden.bs.modal", function () {
        _this2.stream.getTracks()[0].stop();
      });

      this.camModal.on("shown.bs.modal", function () {
        navigator.getUserMedia({
          video: true
        }, function (stream) {
          _this2.stream = stream;
          _this2.webcamVideoElement.srcObject = stream;
          _this2.webcamVideoElement.play();
        }, function (err) {
          console.error(err);
        });
      });
    }
  }, {
    key: "openModal",
    value: function openModal(element) {
      var _this3 = this;

      this.camModal.modal("show");
      this.snapButton.onclick = function () {
        var hiddenCanvas = document.getElementById("hidden-canvas");
        var hiddenContext = hiddenCanvas.getContext("2d");
        hiddenCanvas.width = _this3.webcamVideoElement.width;
        hiddenCanvas.height = _this3.webcamVideoElement.height;
        hiddenContext.drawImage(_this3.webcamVideoElement, 0, 0, hiddenCanvas.width, hiddenCanvas.height);
        var imageDataURL = hiddenCanvas.toDataURL("image/jpg");
        element.src = imageDataURL;
        _this3.camModal.modal("hide");
      };
    }
  }, {
    key: "initializeStyleTransfer",
    value: function initializeStyleTransfer() {
      var _this4 = this;

      // Initialize images
      this.contentImg = document.getElementById("content-img");
      this.contentImg.onerror = function () {
        alert("Error loading " + _this4.contentImg.src + ".");
      };
      this.styleImg = document.getElementById("style-img");
      this.styleImg.onerror = function () {
        alert("Error loading " + _this4.styleImg.src + ".");
      };
      this.stylized = document.getElementById("stylized");

      // Initialize images
      this.contentImgSlider = document.getElementById("content-img-size");
      this.connectImageAndSizeSlider(this.contentImg, this.contentImgSlider);
      this.styleImgSlider = document.getElementById("style-img-size");
      this.styleImgSquare = document.getElementById("style-img-square");
      this.connectImageAndSizeSlider(this.styleImg, this.styleImgSlider, this.styleImgSquare);

      this.styleRatio = 1.0;
      this.styleRatioSlider = document.getElementById("stylized-img-ratio");
      this.styleRatioSlider.oninput = function (evt) {
        _this4.styleRatio = evt.target.value / 100;
      };

      // Initialize buttons
      this.styleButton = document.getElementById("style-button");
      this.styleButton.onclick = function () {
        _this4.disableStylizeButtons();
        _this4.startStyling().finally(function () {
          _this4.enableStylizeButtons();
        });
      };
      this.randomizeButton = document.getElementById("randomize");
      this.randomizeButton.onclick = function () {
        _this4.styleRatioSlider.value = getRndInteger(0, 100);
        _this4.contentImgSlider.value = getRndInteger(256, 400);
        _this4.styleImgSlider.value = getRndInteger(100, 400);
        _this4.styleRatioSlider.dispatchEvent(new Event("input"));
        _this4.contentImgSlider.dispatchEvent(new Event("input"));
        _this4.styleImgSlider.dispatchEvent(new Event("input"));
        if (getRndInteger(0, 1)) {
          _this4.styleImgSquare.click();
        }
      };

      // Initialize selectors
      this.contentSelect = document.getElementById("content-select");
      this.contentSelect.onchange = function (evt) {
        return _this4.setImage(_this4.contentImg, evt.target.value);
      };
      this.contentSelect.onclick = function () {
        return _this4.contentSelect.value = "";
      };
      this.styleSelect = document.getElementById("style-select");
      this.styleSelect.onchange = function (evt) {
        return _this4.setImage(_this4.styleImg, evt.target.value);
      };
      this.styleSelect.onclick = function () {
        return _this4.styleSelect.value = "";
      };
    }
  }, {
    key: "initializeCombineStyles",
    value: function initializeCombineStyles() {
      var _this5 = this;

      // Initialize images
      this.combContentImg = document.getElementById("c-content-img");
      this.combContentImg.onerror = function () {
        alert("Error loading " + _this5.combContentImg.src + ".");
      };
      this.combStyleImg1 = document.getElementById("c-style-img-1");
      this.combStyleImg1.onerror = function () {
        alert("Error loading " + _this5.combStyleImg1.src + ".");
      };
      this.combStyleImg2 = document.getElementById("c-style-img-2");
      this.combStyleImg2.onerror = function () {
        alert("Error loading " + _this5.combStyleImg2.src + ".");
      };
      this.combStylized = document.getElementById("c-stylized");

      // Initialize images
      this.combContentImgSlider = document.getElementById("c-content-img-size");
      this.connectImageAndSizeSlider(this.combContentImg, this.combContentImgSlider);
      this.combStyleImg1Slider = document.getElementById("c-style-img-1-size");
      this.combStyleImg1Square = document.getElementById("c-style-1-square");
      this.connectImageAndSizeSlider(this.combStyleImg1, this.combStyleImg1Slider, this.combStyleImg1Square);
      this.combStyleImg2Slider = document.getElementById("c-style-img-2-size");
      this.combStyleImg2Square = document.getElementById("c-style-2-square");
      this.connectImageAndSizeSlider(this.combStyleImg2, this.combStyleImg2Slider, this.combStyleImg2Square);

      this.combStyleRatio = 0.5;
      this.combStyleRatioSlider = document.getElementById("c-stylized-img-ratio");
      this.combStyleRatioSlider.oninput = function (evt) {
        _this5.combStyleRatio = evt.target.value / 100;
      };

      // Initialize buttons
      this.combineButton = document.getElementById("combine-button");
      this.combineButton.onclick = function () {
        _this5.disableStylizeButtons();
        _this5.startCombining().finally(function () {
          _this5.enableStylizeButtons();
        });
      };
      this.combRandomizeButton = document.getElementById("c-randomize");
      this.combRandomizeButton.onclick = function () {
        _this5.combContentImgSlider.value = getRndInteger(256, 400);
        _this5.combStyleImg1Slider.value = getRndInteger(100, 400);
        _this5.combStyleImg2Slider.value = getRndInteger(100, 400);
        _this5.combStyleRatioSlider.value = getRndInteger(0, 100);
        _this5.combContentImgSlider.dispatchEvent(new Event("input"));
        _this5.combStyleImg1Slider.dispatchEvent(new Event("input"));
        _this5.combStyleImg2Slider.dispatchEvent(new Event("input"));
        _this5.combStyleRatioSlider.dispatchEvent(new Event("input"));
        if (getRndInteger(0, 1)) {
          _this5.combStyleImg1Square.click();
        }
        if (getRndInteger(0, 1)) {
          _this5.combStyleImg2Square.click();
        }
      };

      // Initialize selectors
      this.combContentSelect = document.getElementById("c-content-select");
      this.combContentSelect.onchange = function (evt) {
        return _this5.setImage(_this5.combContentImg, evt.target.value);
      };
      this.combContentSelect.onclick = function () {
        return _this5.combContentSelect.value = "";
      };
      this.combStyle1Select = document.getElementById("c-style-1-select");
      this.combStyle1Select.onchange = function (evt) {
        return _this5.setImage(_this5.combStyleImg1, evt.target.value);
      };
      this.combStyle1Select.onclick = function () {
        return _this5.combStyle1Select.value = "";
      };
      this.combStyle2Select = document.getElementById("c-style-2-select");
      this.combStyle2Select.onchange = function (evt) {
        return _this5.setImage(_this5.combStyleImg2, evt.target.value);
      };
      this.combStyle2Select.onclick = function () {
        return _this5.combStyle2Select.value = "";
      };
    }
  }, {
    key: "connectImageAndSizeSlider",
    value: function connectImageAndSizeSlider(img, slider, square) {
      slider.oninput = function (evt) {
        img.height = evt.target.value;
        if (img.style.width) {
          // If this branch is triggered, then that means the image was forced to a square using
          // a fixed pixel value.
          img.style.width = img.height + "px"; // Fix width back to a square
        }
      };
      if (square !== undefined) {
        square.onclick = function (evt) {
          if (evt.target.checked) {
            img.style.width = img.height + "px";
          } else {
            img.style.width = "";
          }
        };
      }
    }

    // Helper function for setting an image

  }, {
    key: "setImage",
    value: function setImage(element, selectedValue) {
      var _this6 = this;

      if (selectedValue === "file") {
        console.log("file selected");
        this.fileSelect.onchange = function (evt) {
          var f = evt.target.files[0];
          var fileReader = new FileReader();
          fileReader.onload = function (e) {
            element.src = e.target.result;
          };
          fileReader.readAsDataURL(f);
          _this6.fileSelect.value = "";
        };
        this.fileSelect.click();
      } else if (selectedValue === "pic") {
        this.openModal(element);
      } else if (selectedValue === "random") {
        var randomNumber = Math.floor(Math.random() * links.length);
        element.src = links[randomNumber];
      } else {
        element.src = "images/" + selectedValue + ".jpg";
      }
    }
  }, {
    key: "enableStylizeButtons",
    value: function enableStylizeButtons() {
      this.styleButton.disabled = false;
      this.combineButton.disabled = false;
      this.modelSelectStyle.disabled = false;
      this.modelSelectTransformer.disabled = false;
      this.styleButton.textContent = "Stylize";
      this.combineButton.textContent = "Combine Styles";
    }
  }, {
    key: "disableStylizeButtons",
    value: function disableStylizeButtons() {
      this.styleButton.disabled = true;
      this.combineButton.disabled = true;
      this.modelSelectStyle.disabled = true;
      this.modelSelectTransformer.disabled = true;
    }
  }, {
    key: "startStyling",
    value: function startStyling() {
      var _this7 = this;

      var bottleneck, identityBottleneck, styleBottleneck, stylized;
      return regeneratorRuntime.async(function startStyling$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(tf.nextFrame());

            case 2:
              this.styleButton.textContent = "Generating 100D style representation";
              _context5.next = 5;
              return regeneratorRuntime.awrap(tf.nextFrame());

            case 5:
              _context5.next = 7;
              return regeneratorRuntime.awrap(tf.tidy(function () {
                return _this7.styleNet.predict(tf.browser.fromPixels(_this7.styleImg).toFloat().div(tf.scalar(255)).expandDims());
              }));

            case 7:
              bottleneck = _context5.sent;

              if (!(this.styleRatio !== 1.0)) {
                _context5.next = 21;
                break;
              }

              this.styleButton.textContent = "Generating 100D identity style representation";
              _context5.next = 12;
              return regeneratorRuntime.awrap(tf.nextFrame());

            case 12:
              _context5.next = 14;
              return regeneratorRuntime.awrap(tf.tidy(function () {
                return _this7.styleNet.predict(tf.browser.fromPixels(_this7.contentImg).toFloat().div(tf.scalar(255)).expandDims());
              }));

            case 14:
              identityBottleneck = _context5.sent;
              styleBottleneck = bottleneck;
              _context5.next = 18;
              return regeneratorRuntime.awrap(tf.tidy(function () {
                var styleBottleneckScaled = styleBottleneck.mul(tf.scalar(_this7.styleRatio));
                var identityBottleneckScaled = identityBottleneck.mul(tf.scalar(1.0 - _this7.styleRatio));
                return styleBottleneckScaled.addStrict(identityBottleneckScaled);
              }));

            case 18:
              bottleneck = _context5.sent;

              styleBottleneck.dispose();
              identityBottleneck.dispose();

            case 21:
              this.styleButton.textContent = "Stylizing image...";
              _context5.next = 24;
              return regeneratorRuntime.awrap(tf.nextFrame());

            case 24:
              _context5.next = 26;
              return regeneratorRuntime.awrap(tf.tidy(function () {
                return _this7.transformNet.predict([tf.browser.fromPixels(_this7.contentImg).toFloat().div(tf.scalar(255)).expandDims(), bottleneck]).squeeze();
              }));

            case 26:
              stylized = _context5.sent;
              _context5.next = 29;
              return regeneratorRuntime.awrap(tf.browser.toPixels(stylized, this.stylized));

            case 29:
              bottleneck.dispose(); // Might wanna keep this around
              stylized.dispose();

            case 31:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "startCombining",
    value: function startCombining() {
      var _this8 = this;

      var bottleneck1, bottleneck2, combinedBottleneck, stylized;
      return regeneratorRuntime.async(function startCombining$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(tf.nextFrame());

            case 2:
              this.combineButton.textContent = "Generating 100D style representation of image 1";
              _context6.next = 5;
              return regeneratorRuntime.awrap(tf.nextFrame());

            case 5:
              _context6.next = 7;
              return regeneratorRuntime.awrap(tf.tidy(function () {
                return _this8.styleNet.predict(tf.browser.fromPixels(_this8.combStyleImg1).toFloat().div(tf.scalar(255)).expandDims());
              }));

            case 7:
              bottleneck1 = _context6.sent;


              this.combineButton.textContent = "Generating 100D style representation of image 2";
              _context6.next = 11;
              return regeneratorRuntime.awrap(tf.nextFrame());

            case 11:
              _context6.next = 13;
              return regeneratorRuntime.awrap(tf.tidy(function () {
                return _this8.styleNet.predict(tf.browser.fromPixels(_this8.combStyleImg2).toFloat().div(tf.scalar(255)).expandDims());
              }));

            case 13:
              bottleneck2 = _context6.sent;


              this.combineButton.textContent = "Stylizing image...";
              _context6.next = 17;
              return regeneratorRuntime.awrap(tf.nextFrame());

            case 17:
              _context6.next = 19;
              return regeneratorRuntime.awrap(tf.tidy(function () {
                var scaledBottleneck1 = bottleneck1.mul(tf.scalar(1 - _this8.combStyleRatio));
                var scaledBottleneck2 = bottleneck2.mul(tf.scalar(_this8.combStyleRatio));
                return scaledBottleneck1.addStrict(scaledBottleneck2);
              }));

            case 19:
              combinedBottleneck = _context6.sent;
              _context6.next = 22;
              return regeneratorRuntime.awrap(tf.tidy(function () {
                return _this8.transformNet.predict([tf.browser.fromPixels(_this8.combContentImg).toFloat().div(tf.scalar(255)).expandDims(), combinedBottleneck]).squeeze();
              }));

            case 22:
              stylized = _context6.sent;
              _context6.next = 25;
              return regeneratorRuntime.awrap(tf.browser.toPixels(stylized, this.combStylized));

            case 25:
              bottleneck1.dispose(); // Might wanna keep this around
              bottleneck2.dispose();
              combinedBottleneck.dispose();
              stylized.dispose();

            case 29:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "benchmark",
    value: function benchmark() {
      var x, bottleneck, styleNet, time, transformNet;
      return regeneratorRuntime.async(function benchmark$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              x = tf.randomNormal([1, 256, 256, 3]);
              bottleneck = tf.randomNormal([1, 1, 1, 100]);
              _context7.next = 4;
              return regeneratorRuntime.awrap(this.loadInceptionStyleModel());

            case 4:
              styleNet = _context7.sent;
              _context7.next = 7;
              return regeneratorRuntime.awrap(this.benchmarkStyle(x, styleNet));

            case 7:
              time = _context7.sent;

              styleNet.dispose();

              _context7.next = 11;
              return regeneratorRuntime.awrap(this.loadMobileNetStyleModel());

            case 11:
              styleNet = _context7.sent;
              _context7.next = 14;
              return regeneratorRuntime.awrap(this.benchmarkStyle(x, styleNet));

            case 14:
              time = _context7.sent;

              styleNet.dispose();

              _context7.next = 18;
              return regeneratorRuntime.awrap(this.loadOriginalTransformerModel());

            case 18:
              transformNet = _context7.sent;
              _context7.next = 21;
              return regeneratorRuntime.awrap(this.benchmarkTransform(x, bottleneck, transformNet));

            case 21:
              time = _context7.sent;

              transformNet.dispose();

              _context7.next = 25;
              return regeneratorRuntime.awrap(this.loadSeparableTransformerModel());

            case 25:
              transformNet = _context7.sent;
              _context7.next = 28;
              return regeneratorRuntime.awrap(this.benchmarkTransform(x, bottleneck, transformNet));

            case 28:
              time = _context7.sent;

              transformNet.dispose();

              x.dispose();
              bottleneck.dispose();

            case 32:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "benchmarkStyle",
    value: function benchmarkStyle(x, styleNet) {
      var profile, time;
      return regeneratorRuntime.async(function benchmarkStyle$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(tf.profile(function () {
                tf.tidy(function () {
                  var dummyOut = styleNet.predict(x);
                  dummyOut.print();
                });
              }));

            case 2:
              profile = _context8.sent;

              console.log(profile);
              _context8.next = 6;
              return regeneratorRuntime.awrap(tf.time(function () {
                tf.tidy(function () {
                  for (var i = 0; i < 10; i++) {
                    var y = styleNet.predict(x);
                    y.print();
                  }
                });
              }));

            case 6:
              time = _context8.sent;

              console.log(time);

            case 8:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "benchmarkTransform",
    value: function benchmarkTransform(x, bottleneck, transformNet) {
      var profile, time;
      return regeneratorRuntime.async(function benchmarkTransform$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(tf.profile(function () {
                tf.tidy(function () {
                  var dummyOut = transformNet.predict([x, bottleneck]);
                  dummyOut.print();
                });
              }));

            case 2:
              profile = _context9.sent;

              console.log(profile);
              _context9.next = 6;
              return regeneratorRuntime.awrap(tf.time(function () {
                tf.tidy(function () {
                  for (var i = 0; i < 10; i++) {
                    var y = transformNet.predict([x, bottleneck]);
                    y.print();
                  }
                });
              }));

            case 6:
              time = _context9.sent;

              console.log(time);

            case 8:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    }
  }]);

  return Main;
}();

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.mobilecheck = function () {
  var check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};
window.addEventListener("load", function () {
  return new Main();
});

},{}]},{},[1]);
