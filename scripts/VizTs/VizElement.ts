/// <reference path="VizAttribute.ts"/>

module VizTs {
    export class VizElement {
        name: string;
        private attributes: VizAttribute[];

        constructor(name: string) {
            this.name = name;
            this.attributes = [];
        }

        attr(name: string, value: string): void {
            for (var key in this.attributes) {
                var attribute = this.attributes[key];
                if (attribute.name == name) {
                    attribute.value = value;
                    return;
                }
            }
            this.attributes.push(new VizAttribute(name, value));
        }

        attrNotNull(name: string, value: string): void {
            if (value != null)
                this.attr(name, value);
        }

        attrNumber(name: string, value: number): void {
            this.attr(name, `${value}`);
        }

		hasAttributes(): boolean {
			return this.attributes.length > 0;
		}

        toCode(): string {
            if (this.attributes.length === 0)
                return this.name + VizHelpers.newLine;

            var buffer = [];
            buffer.push(this.name, ' [');
            this.attributes.forEach((a, i) => {
	            if (i > 0)
		            buffer.push(', ');
				buffer.push(a.toCode());
            });
            buffer.push(']', VizHelpers.newLine);
            return buffer.join('');
        }
    }
}