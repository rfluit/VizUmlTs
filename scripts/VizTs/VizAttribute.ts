module VizTs {
    export class VizAttribute {
        name: string;
        value: string;

        constructor(name: string, value: string) {
            this.name = name;
            this.value = value;
        }

        toCode(): string {
	        if (VizHelpers.escapeAttributeString(this.value).indexOf('<') != -1) {
		        debugger;
	        }

            return this.name + '="' + VizHelpers.escapeAttributeString(this.value) + '"';
        }
    }
}