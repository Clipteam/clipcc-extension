// Typescript support

export as namespace clipcc;

declare module 'clipcc-extension' {
    export namespace type {
        export declare enum BlockType {
            COMMAND = 1,
            REPORTER = 2,
            BOOLEAN = 3,
            BRANCH = 4,
            HAT = 5
        }
    
        export declare enum ParameterType {
            NUMBER = 1,
            STRING = 2,
            BOOLEAN = 3,
            ANY = 4,
            COLOR = 5,
            MATRIX = 6,
            NOTE = 7,
            ANGLE = 8,
            IMAGE = 99
        }
    
        export declare enum ShadowType {
            NO_SHADOW = false,
            ANGLE =  { type: 'math_angle', fieldName: 'NUM' },
            COLOR = { type: 'colour_picker', fieldName: 'COLOUR' },
            NUMBER = { type: 'math_number', fieldName: 'NUM' },
            STRING = { type: 'text', fieldName: 'TEXT' },
            MATRIX = { type: 'matrix', fieldName: 'MATRIX' },
            NOTE = { type: 'note', fieldName: 'NOTE' }
        }
    
        export declare interface ExtensionInfo {
            id: string;
            version: string;
            author: string | string[];
            icon: string;
            inset_icon: string;
            api: number;
            dependency: { [key: string]: string };
        }

        export declare interface BlockPrototype {
            opcode: string,
            type: BlockType,
            messageId: string,
            categoryId: string,
            function: Function,
            param?: { [key: string]: ParameterPrototype }
        }
    
        export declare interface ParameterPrototype {
            type: ParameterType,
            default?: any,
            shadow?: ShadowPrototype
        }
    
        export declare interface ShadowPrototype {
            type: string;
            fieldName: string;
        }

        export declare interface CategoryPrototype {
            categoryId: string;
            messageId: string;
            color: string;
        }
    }

    export namespace api {
        export declare function registExtensionAPI(api: Object): void;
        export declare function addCategory(category: type.CategoryPrototype): void;
        export declare function removeCategory(categoryId: string): void;
        export declare function addBlock(block: type.BlockPrototype): void;
        export declare function removeBlock(opcode: string): void;
        export declare function getVmInstance(): Object;
        export declare function getGuiInstance(): Object;
        export declare function getBlockInstance(): Object;
        export declare function getStageCanvas(): HTMLCanvasElement;
        export declare function registerGlobalFunction(name: string, func: Function): void;
        export declare function unregisterGlobalFunction(name: string): void;
        export declare function callGlobalFunction(name: string, ...args: any[]): any;
        export declare function migrateChangeBlock(targets: Object, srcBlockId: string, dstBlockId: string): void;
    }

    export namespace error {
        declare const ERROR_UNAVAILABLE_EXTENSION = 0x90;
        declare const ERROR_CIRCULAR_REQUIREMENT = 0x91;
    }

    export declare class MigrationHelper {
        constructor();
        addVersionMigration(srcVer: string, dstVer: string, migrationScript: Function): void;
        migrationFromVersion(srcVer: string, dstVer: string, projectData: Object): void;
    }

    declare enum LoadMode {
        UNLOAD = 0,
        INITIATIVE_LOAD = 1,
        PASSIVE_LOAD = 2
    }

    declare interface ExtensionLoadInfo {
        id: string;
        mode: LoadMode;
    }

    export declare class ExtensionManager {
        constructor();
        addInstance(id: string, info: type.ExtensionInfo, instance: Extension): void;
        removeInstance(id: string): void;
        getInstance(id: string): Extension;
        getInfo(id: string): type.ExtensionInfo;
        exist(id: string): boolean;
        setLoadStatus(id: string, loadStatus: boolean): void;
        getLoadStatus(id: string): boolean;
        getLoadedExtensions(): string[];
        loadExtensionsWithMode(extensions: ExtensionLoadInfo[], vmCallback: Function): void;
        unloadExtensions(extensions: string[]);
        getExtensionLoadOrder(extensions: string[]): ExtensionLoadInfo[];
        getExtensionUnloadOrder(extensions: string[]): string[];
        emitEventToExtension(id: string, event: string, ...args: any[]): void;
        emitEventToAll(event: string, ...args): void;
        emitEvent(event: string, ...args: any[]): void;
    }

    export declare const extensionManager: ExtensionManager;

    export declare class Extension {
        constructor();
        onInit(): void;
        onUninit(): void;
        beforeProjectLoad(data: any, extensions: any): void;
        beforeProjectSave(data: any): void;
    }

    export declare class CompatibleExtension extends Extension {
        constructor();
        onInit(): void;
    }
}

