// (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//     'use strict';
    
//     var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();
    
    //=============================================
    //utility functions
    arrayHas = function (arr, val) {
        // the val might be a single value or array of values
    
        if (Array.isArray(val)) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;
    
            try {
                for (var _iterator = val[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var i = _step.value;
    
                    if (arr.indexOf(i) === -1) {
                        return false;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
    
            return true;
        }
    
        if (arr.indexOf(val) === -1) {
            return false;
        }
    
        return true;
    };
    //=============================================
    
    //This is the app module
    //Module Dependencieds
    'use strict';
    var $ = require('jquery'),
    
    //jQuery    = $,
    bootstrap = require('bootstrap'),
    
    //Module Variables
    human,
        computer,
        arrayHas,
        gameGrid = {
        rows: [[0, 1, 2], [3, 4, 5], [6, 7, 8]],
        columns: [[0, 3, 6], [1, 4, 7], [2, 5, 8]],
        diagonal1: [[0, 4, 8]],
        diagonal2: [[2, 4, 6]]
    },
        gamePoints = [0, 1, 2, 3, 4, 5, 6, 7, 8],
        jQMap = {},
        configMap = {};
    
    human = {
        moves: [],
        play: function play() {
            //event handler
            //'this' is a DOM
            var move = undefined,
                $this = $(this),
                $symbol = $this.children('.symbol');
    
            if ($symbol.text()) {
                return false;
            }
    
            $symbol.text(configMap.humanSymbol || 'X');
            move = +$this.attr('id');
            human.moves.push(move);
            jQMap.$playBox.off('click');
            setTimeout(function () {
                computer.playNextTurn.call(computer);
                jQMap.$playBox.on('click', human.play);
            }, 300);
            return false;
        }
    };
    
    computer = {
        winningPoints: undefined,
        playNextTurn: undefined,
        moves: [],
        startPoints: [0, 2, 4, 6, 8],
        centerParttern: false,
        fourthWinningOptions: [{ blockedPoint: 0, winningOptions: [1, 3] }, { blockedPoint: 2, winningOptions: [1, 5] }, { blockedPoint: 6, winningOptions: [3, 7] }, { blockedPoint: 8, winningOptions: [7, 5] }],
    
        makeFirstMove: function makeFirstMove() {
            var move;
            move = this.startPoints[Math.round(Math.random() * (this.startPoints.length - 1))];
            //move = 4;// this assignment is purely for test purpose.  REMOVE IT
            this.centerParttern = move === 4 ? true : false;
            this.makeMOve(move);
            this.playNextTurn = this.makeSecondMove;
        },
        makeSecondMove: function makeSecondMove() {
            var secondMove,
                firstHumanMove = human.moves[0],
                computerFirstOptions = {
                0: {
                    computerOptions: [2, 6],
                    humanOptions: [{ opt: 1, move: 2 }, { opt: 2, move: 6 }, { opt: 4, move: 8 }, { opt: 3, move: 6 }, { opt: 6, move: 2 }]
                },
                2: {
                    computerOptions: [0, 8],
                    humanOptions: [{ opt: 1, move: 0 }, { opt: 0, move: 8 }, { opt: 4, move: 6 }, { opt: 5, move: 8 }, { opt: 8, move: 0 }]
                },
                6: {
                    computerOptions: [0, 8],
                    humanOptions: [{ opt: 3, move: 0 }, { opt: 0, move: 8 }, { opt: 4, move: 2 }, { opt: 7, move: 8 }, { opt: 8, move: 0 }]
                },
                8: {
                    computerOptions: [6, 2],
                    humanOptions: [{ opt: 7, move: 6 }, { opt: 6, move: 2 }, { opt: 4, move: 0 }, { opt: 5, move: 2 }, { opt: 2, move: 6 }]
                }
            },
                cfo = computerFirstOptions;
    
            //first check if computer is moving center
            if (this.centerParttern) {
                // if human has played one of my desired points
                // use that point to set two_way trap
                if (arrayHas(this.startPoints, human.moves[0])) {
                    var humanFirstMove = human.moves[0],
                        lastGamePoint = gamePoints[gamePoints.length - 1];
    
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;
    
                    try {
                        for (var _iterator2 = gamePoints[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var game = _step2.value;
    
                            if (game === humanFirstMove) {
                                this.makeMOve(lastGamePoint);
                                this.playNextTurn = this.makeThirdMove;
                                return false;
                            }
    
                            lastGamePoint -= 1;
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
    
                //if the above failed, set a winningpoint for third move, it would be a two-way trap
                // if human blocks the winning point, third move would set two_way winingpoints
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;
    
                try {
                    for (var _iterator3 = Object.keys(gameGrid)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var grid = _step3.value;
                        var _iteratorNormalCompletion4 = true;
                        var _didIteratorError4 = false;
                        var _iteratorError4 = undefined;
    
                        try {
                            for (var _iterator4 = gameGrid[grid][Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                var line = _step4.value;
    
                                if (arrayHas(line, human.moves[0]) && !arrayHas(line, this.moves[0])) {
                                    var two_way_trap = undefined,
                                        lastGamePoint = gamePoints[gamePoints.length - 1],
                                        foundMatch = false;
    
                                    while (!foundMatch) {
                                        var randomGamePoint = Math.round(Math.random() * (line.length - 1));
    
                                        two_way_trap = line[randomGamePoint];
    
                                        if (!arrayHas(human.moves, two_way_trap) && !arrayHas(this.moves, two_way_trap)) {
                                            foundMatch = true;
                                        }
                                    }
    
                                    this.winningPoints = [two_way_trap];
    
                                    var _iteratorNormalCompletion5 = true;
                                    var _didIteratorError5 = false;
                                    var _iteratorError5 = undefined;
    
                                    try {
                                        for (var _iterator5 = gamePoints[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                            var point = _step5.value;
    
                                            if (point === two_way_trap) {
                                                this.makeMOve(lastGamePoint);
                                                this.playNextTurn = this.makeThirdMove;
                                                return;
                                            }
                                            lastGamePoint -= 1;
                                        }
                                    } catch (err) {
                                        _didIteratorError5 = true;
                                        _iteratorError5 = err;
                                    } finally {
                                        try {
                                            if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                                _iterator5.return();
                                            }
                                        } finally {
                                            if (_didIteratorError5) {
                                                throw _iteratorError5;
                                            }
                                        }
                                    }
                                }
                            }
                        } catch (err) {
                            _didIteratorError4 = true;
                            _iteratorError4 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                    _iterator4.return();
                                }
                            } finally {
                                if (_didIteratorError4) {
                                    throw _iteratorError4;
                                }
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
            }
    
           