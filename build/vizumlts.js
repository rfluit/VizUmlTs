var VizTs;
(function (VizTs) {
    var VizArrowShapes = (function () {
        function VizArrowShapes() {
        }
        VizArrowShapes.box = 'box';
        VizArrowShapes.lbox = 'lbox';
        VizArrowShapes.rbox = 'rbox';
        VizArrowShapes.obox = 'obox';
        VizArrowShapes.olbox = 'olbox';
        VizArrowShapes.orbox = 'orbox';
        VizArrowShapes.crow = 'crow';
        VizArrowShapes.lcrow = 'lcrow';
        VizArrowShapes.rcrow = 'rcrow';
        VizArrowShapes.diamond = 'diamond';
        VizArrowShapes.ldiamond = 'ldiamond';
        VizArrowShapes.rdiamond = 'rdiamond';
        VizArrowShapes.odiamond = 'odiamond';
        VizArrowShapes.oldiamond = 'oldiamond';
        VizArrowShapes.ordiamond = 'ordiamond';
        VizArrowShapes.dot = 'dot';
        VizArrowShapes.odot = 'odot';
        VizArrowShapes.inv = 'inv';
        VizArrowShapes.linv = 'linv';
        VizArrowShapes.rinv = 'rinv';
        VizArrowShapes.oinv = 'oinv';
        VizArrowShapes.olinv = 'olinv';
        VizArrowShapes.orinv = 'orinv';
        VizArrowShapes.none = 'none';
        VizArrowShapes.normal = 'normal';
        VizArrowShapes.lnormal = 'lnormal';
        VizArrowShapes.rnormal = 'rnormal';
        VizArrowShapes.onormal = 'onormal';
        VizArrowShapes.olnormal = 'olnormal';
        VizArrowShapes.ornormal = 'ornormal';
        VizArrowShapes.tee = 'tee';
        VizArrowShapes.ltee = 'ltee';
        VizArrowShapes.rtee = 'rtee';
        VizArrowShapes.vee = 'vee';
        VizArrowShapes.lvee = 'lvee';
        VizArrowShapes.rvee = 'rvee';
        VizArrowShapes.curve = 'curve';
        VizArrowShapes.lcurve = 'lcurve';
        VizArrowShapes.rcurve = 'rcurve';
        VizArrowShapes.icurve = 'icurve';
        VizArrowShapes.licurve = 'licurve';
        VizArrowShapes.ricurve = 'ricurve';
        return VizArrowShapes;
    })();
    VizTs.VizArrowShapes = VizArrowShapes;
})(VizTs || (VizTs = {}));
var VizTs;
(function (VizTs) {
    var VizAttribute = (function () {
        function VizAttribute(name, value) {
            this.name = name;
            this.value = value;
        }
        VizAttribute.prototype.toCode = function () {
            if (VizTs.VizHelpers.escapeAttributeString(this.value).indexOf('<') != -1) {
                debugger;
            }
            return this.name + '="' + VizTs.VizHelpers.escapeAttributeString(this.value) + '"';
        };
        return VizAttribute;
    })();
    VizTs.VizAttribute = VizAttribute;
})(VizTs || (VizTs = {}));
/// <reference path="VizAttribute.ts"/>
var VizTs;
(function (VizTs) {
    var VizElement = (function () {
        function VizElement(name) {
            this.name = name;
            this.attributes = [];
        }
        VizElement.prototype.attr = function (name, value) {
            for (var key in this.attributes) {
                var attribute = this.attributes[key];
                if (attribute.name == name) {
                    attribute.value = value;
                    return;
                }
            }
            this.attributes.push(new VizTs.VizAttribute(name, value));
        };
        VizElement.prototype.attrNotNull = function (name, value) {
            if (value != null)
                this.attr(name, value);
        };
        VizElement.prototype.attrNumber = function (name, value) {
            this.attr(name, "" + value);
        };
        VizElement.prototype.hasAttributes = function () {
            return this.attributes.length > 0;
        };
        VizElement.prototype.toCode = function () {
            if (this.attributes.length === 0)
                return this.name + VizTs.VizHelpers.newLine;
            var buffer = [];
            buffer.push(this.name, ' [');
            this.attributes.forEach(function (a, i) {
                if (i > 0)
                    buffer.push(', ');
                buffer.push(a.toCode());
            });
            buffer.push(']', VizTs.VizHelpers.newLine);
            return buffer.join('');
        };
        return VizElement;
    })();
    VizTs.VizElement = VizElement;
})(VizTs || (VizTs = {}));
/// <reference path="VizElement.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var VizTs;
(function (VizTs) {
    var VizStatement = (function (_super) {
        __extends(VizStatement, _super);
        function VizStatement() {
            _super.apply(this, arguments);
        }
        return VizStatement;
    })(VizTs.VizElement);
    VizTs.VizStatement = VizStatement;
})(VizTs || (VizTs = {}));
/// <reference path="VizStatement.ts"/>
var VizTs;
(function (VizTs) {
    var VizEdge = (function (_super) {
        __extends(VizEdge, _super);
        function VizEdge(name, from, to, label, arrowHead, arrowTail, style, fontsize, headLabel, tailLabel) {
            if (label === void 0) { label = null; }
            if (arrowHead === void 0) { arrowHead = null; }
            if (arrowTail === void 0) { arrowTail = null; }
            if (style === void 0) { style = null; }
            if (fontsize === void 0) { fontsize = null; }
            if (headLabel === void 0) { headLabel = null; }
            if (tailLabel === void 0) { tailLabel = null; }
            _super.call(this, name);
            this.from = from;
            this.to = to;
            this.label = label;
            this.arrowHead = arrowHead;
            this.arrowTail = arrowTail;
            this.style = style;
            this.fontsize = fontsize;
            this.headLabel = headLabel;
            this.tailLabel = tailLabel;
        }
        VizEdge.prototype.toCode = function () {
            this.name = this.from.name + ' -> ' + this.to.name;
            this.attrNotNull('label', this.label);
            this.attrNotNull('arrowhead', this.arrowHead);
            this.attrNotNull('arrowtail', this.arrowTail);
            this.attrNotNull('style', this.style);
            if (this.fontsize !== null)
                this.attrNumber('fontsize', this.fontsize);
            return _super.prototype.toCode.call(this);
        };
        return VizEdge;
    })(VizTs.VizStatement);
    VizTs.VizEdge = VizEdge;
})(VizTs || (VizTs = {}));
var VizTs;
(function (VizTs) {
    var VizEdgeStyles = (function () {
        function VizEdgeStyles() {
        }
        VizEdgeStyles.solid = 'solid';
        VizEdgeStyles.dashed = 'dashed';
        VizEdgeStyles.dotted = 'dotted';
        VizEdgeStyles.bold = 'bold';
        return VizEdgeStyles;
    })();
    VizTs.VizEdgeStyles = VizEdgeStyles;
})(VizTs || (VizTs = {}));
var VizTs;
(function (VizTs) {
    var VizGraphKind = (function () {
        function VizGraphKind() {
        }
        VizGraphKind.graph = 'graph';
        VizGraphKind.digraph = 'digraph';
        return VizGraphKind;
    })();
    VizTs.VizGraphKind = VizGraphKind;
})(VizTs || (VizTs = {}));
var VizTs;
(function (VizTs) {
    var VizNode = (function (_super) {
        __extends(VizNode, _super);
        function VizNode() {
            _super.apply(this, arguments);
        }
        VizNode.prototype.label = function (value) {
            this.attr('label', value);
        };
        return VizNode;
    })(VizTs.VizStatement);
    VizTs.VizNode = VizNode;
})(VizTs || (VizTs = {}));
var VizTs;
(function (VizTs) {
    var VizNodeSettings = (function (_super) {
        __extends(VizNodeSettings, _super);
        function VizNodeSettings() {
            _super.call(this, 'node');
        }
        VizNodeSettings.prototype.shape = function (value) {
            this.attr('shape', value);
        };
        VizNodeSettings.prototype.fontsize = function (value) {
            this.attrNumber('fontsize', value);
        };
        VizNodeSettings.prototype.rankdir = function (value) {
            this.attr('rankdir', value);
        };
        VizNodeSettings.prototype.margin = function (value) {
            this.attr('margin', value);
        };
        VizNodeSettings.prototype.pad = function (value) {
            this.attr('pad', value);
        };
        VizNodeSettings.prototype.toCode = function () {
            if (!this.hasAttributes())
                return '';
            return _super.prototype.toCode.call(this);
        };
        return VizNodeSettings;
    })(VizTs.VizElement);
    VizTs.VizNodeSettings = VizNodeSettings;
})(VizTs || (VizTs = {}));
var VizTs;
(function (VizTs) {
    var VizHelpers = (function () {
        function VizHelpers() {
        }
        VizHelpers.escapeAttributeString = function (text) {
            if (text == null)
                return null;
            return text
                .replace(/\\/g, '\\\\')
                .replace(/"/g, '\\"')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
        };
        VizHelpers.newLine = '\r\n';
        return VizHelpers;
    })();
    VizTs.VizHelpers = VizHelpers;
})(VizTs || (VizTs = {}));
/// <reference path="VizAttribute.ts"/>
/// <reference path="VizElement.ts"/>
/// <reference path="VizStatement.ts"/>
/// <reference path="VizGraphKind.ts"/>
/// <reference path="VizNode.ts"/>
/// <reference path="VizNodeSettings.ts"/>
/// <reference path="VizArrowShapes.ts"/>
/// <reference path="VizHelpers.ts"/>
var VizTs;
(function (VizTs) {
    var VizGraph = (function () {
        function VizGraph(graphKind, name) {
            this.nextEdgeNumber = 0;
            this.name = name;
            this.graphKind = graphKind;
            this.nodeSettings = new VizTs.VizNodeSettings();
            this.statements = [];
        }
        VizGraph.prototype.add = function (statement) {
            if (statement)
                this.statements.push(statement);
        };
        VizGraph.prototype.node = function (name, label) {
            if (label === void 0) { label = null; }
            var node = new VizTs.VizNode(name);
            if (label)
                node.label(label);
            this.add(node);
            return node;
        };
        VizGraph.prototype.edge = function (from, to, label, arrowHead, arrowTail, style, fontsize, headLabel, tailLabel) {
            if (label === void 0) { label = null; }
            if (arrowHead === void 0) { arrowHead = null; }
            if (arrowTail === void 0) { arrowTail = null; }
            if (style === void 0) { style = null; }
            if (fontsize === void 0) { fontsize = null; }
            if (headLabel === void 0) { headLabel = null; }
            if (tailLabel === void 0) { tailLabel = null; }
            var edge = new VizTs.VizEdge('__edge' + this.nextEdgeNumber++, from, to, label, arrowHead, arrowTail, style, fontsize, headLabel, tailLabel);
            this.add(edge);
            return edge;
        };
        VizGraph.prototype.toCode = function () {
            var buffer = [];
            buffer.push(this.graphKind, ' ', this.name, ' {', VizTs.VizHelpers.newLine);
            buffer.push(this.nodeSettings.toCode());
            this.statements.forEach(function (s) { return buffer.push(s.toCode()); });
            buffer.push('}');
            return buffer.join('');
        };
        return VizGraph;
    })();
    VizTs.VizGraph = VizGraph;
})(VizTs || (VizTs = {}));
var VizUml;
(function (VizUml) {
    var VizUmlGraph = (function () {
        function VizUmlGraph(name) {
            this.nextNodeNumber = 0;
            this.name = name;
            this.types = [];
            this.relations = [];
        }
        VizUmlGraph.prototype.addClass = function (name, tag) {
            if (tag === void 0) { tag = null; }
            var type = new VizUmlType('__node' + this.nextNodeNumber++, name, tag);
            this.types.push(type);
            return type;
        };
        VizUmlGraph.prototype.addInterface = function (name, tag) {
            if (tag === void 0) { tag = null; }
            var type = new VizUmlType('__node' + this.nextNodeNumber++, name, tag);
            this.types.push(type);
            return type;
        };
        VizUmlGraph.prototype.isA = function (child, parent) {
            return this.addRelation(child, parent, 'is a', VizTs.VizArrowShapes.onormal, null, VizTs.VizEdgeStyles.solid);
        };
        VizUmlGraph.prototype.implements = function (subject, abstraction) {
            return this.addRelation(subject, abstraction, 'implements', VizTs.VizArrowShapes.onormal, null, VizTs.VizEdgeStyles.dashed);
        };
        VizUmlGraph.prototype.uses = function (subject, uses) {
            return this.addRelation(subject, uses, '<<uses>>', VizTs.VizArrowShapes.vee, null, VizTs.VizEdgeStyles.dashed);
        };
        VizUmlGraph.prototype.association = function (subject, associatesWith, subjectLabel, associatedWithLabel) {
            if (subjectLabel === void 0) { subjectLabel = null; }
            if (associatedWithLabel === void 0) { associatedWithLabel = null; }
            var relation = this.addRelation(subject, associatesWith, null, VizTs.VizArrowShapes.vee, null, VizTs.VizEdgeStyles.dashed);
            relation.fromLabel(subjectLabel);
            relation.toLabel(associatedWithLabel);
            return relation;
        };
        VizUmlGraph.prototype.addRelation = function (from, to, label, arrowHead, arrowTail, style, fontsize) {
            if (label === void 0) { label = null; }
            if (arrowHead === void 0) { arrowHead = null; }
            if (arrowTail === void 0) { arrowTail = null; }
            if (style === void 0) { style = null; }
            if (fontsize === void 0) { fontsize = null; }
            var relation = new VizUml.VizUmlRelation(from, to, label, arrowHead, arrowTail, style, fontsize);
            this.relations.push(relation);
            return relation;
        };
        VizUmlGraph.prototype.toCode = function () {
            var graph = new VizTs.VizGraph(VizTs.VizGraphKind.digraph, this.name);
            graph.nodeSettings.shape("box");
            var nodes = new Array();
            for (var key in this.types) {
                var type = this.types[key];
                nodes[type.name] = type.addToGraph(graph);
            }
            for (var key in this.relations) {
                var relation = this.relations[key];
                relation.addToGraph(graph, nodes);
            }
            return graph.toCode();
        };
        return VizUmlGraph;
    })();
    VizUml.VizUmlGraph = VizUmlGraph;
    var VizUmlType = (function () {
        function VizUmlType(name, label, tag) {
            this.name = name;
            this.label = label;
            this.tag = tag;
        }
        VizUmlType.prototype.addToGraph = function (graph) {
            var node = graph.node(this.name, this.label);
            if (this.style)
                node.attr('style', this.style);
            return node;
        };
        return VizUmlType;
    })();
    VizUml.VizUmlType = VizUmlType;
})(VizUml || (VizUml = {}));
var VizUml;
(function (VizUml) {
    var VizUmlRelation = (function () {
        function VizUmlRelation(from, to, label, arrowHead, arrowTail, style, fontsize) {
            if (label === void 0) { label = null; }
            if (arrowHead === void 0) { arrowHead = null; }
            if (arrowTail === void 0) { arrowTail = null; }
            if (style === void 0) { style = null; }
            if (fontsize === void 0) { fontsize = null; }
            this.from = from;
            this.to = to;
            this.label = label;
            this.arrowHead = arrowHead;
            this.arrowTail = arrowTail;
            this.style = style;
            this.fontsize = fontsize;
        }
        VizUmlRelation.prototype.fromLabel = function (label) {
            this.headLabel = label;
        };
        VizUmlRelation.prototype.toLabel = function (label) {
            this.tailLabel = label;
        };
        VizUmlRelation.prototype.addToGraph = function (graph, nodes) {
            graph.edge(nodes[this.from.name], nodes[this.to.name], this.label, this.arrowHead, this.arrowTail, this.style, this.fontsize, this.headLabel, this.tailLabel);
        };
        return VizUmlRelation;
    })();
    VizUml.VizUmlRelation = VizUmlRelation;
})(VizUml || (VizUml = {}));
//# sourceMappingURL=vizumlts.js.map