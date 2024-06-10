export declare interface Responses {
	"new:client": (id: string) => void;
	"log:message": (msg: string, id: number) => void;
	"new:message": (msg: string, id: number) => void;
	"off:client": (id: string) => void;
}

export declare interface Events {
	"send:message": (msg: string) => void;
	"send:all:connect": (id: string) => void;
	"send:all:message": (msg: string) => void;
}
