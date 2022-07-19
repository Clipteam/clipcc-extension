// TypeScript Support for ClipCC Extension API v1

declare module 'clipcc-extension' {
    export namespace type {
        export enum BlockType {
            COMMAND = 1,
            REPORTER = 2,
            BOOLEAN = 3,
            // BRANCH = 4, /* deleted */
            HAT = 5
        }
    
        export enum ParameterType {
            NUMBER = 1,
            STRING = 2,
            BOOLEAN = 3,
            COLOR = 5,
            MATRIX = 6,
            NOTE = 7,
            ANGLE = 8,
            IMAGE = 99
        }
    
        export interface ExtensionInfo {
            id: string;
            version: string;
            author: string | string[];
            icon: string;
            inset_icon: string;
            api: number;
            optional?: boolean;
            dependency: { [key: string]: string };
        }

        export interface SettingsItemBoolean {
            id: string;
            type: "boolean";
            default: boolean;
        }

        export interface SettingsItemNumber {
            id: string;
            type: "number";
            default: number;
            max?: number;
            min?: number;
            precision?: number;
        }

        export interface SettingsItemSelector {
            id: string;
            type: "selector";
            default: string;
            items: string[];
        }

        export type SettingsItem = SettingsItemBoolean | SettingsItemNumber | SettingsItemSelector;

        export interface BlockPrototype {
            opcode: string;
            type: BlockType;
            option?: BlockOption;
            branchCount?: number;
            param?: { [key: string]: ParameterPrototype };
            messageId: string;
            categoryId: string;
            function: Function;
        }

        export interface BlockOption {
            terminal?: boolean;
            monitor?: boolean;
        }
    
        export interface ParameterPrototype {
            type: ParameterType;
            default?: any;
            menu?: MenuItemPrototype[];
            menuId?: string;
            field?: boolean;
            shadow?: ShadowPrototype;
        }

        export interface MenuItemPrototype {
            messageId: string;
            value: any;
        }
    
        export interface ShadowPrototype {
            type: string;
            fieldName: string;
        }

        export interface CategoryPrototype {
            categoryId: string;
            messageId: string;
            color: string;
        }

        export type VmInstance = Object;
        export type BlockInstance = Object;
        export type GuiInstance = Object;
        export type Project = Object;
    }

    export namespace api {
        export function registExtensionAPI(api: Object): void;

        export function addCategory(category: type.CategoryPrototype): void;
        export function removeCategory(categoryId: string): void;
        export function addBlock(block: type.BlockPrototype): void;
        export function addBlocks(blocks: type.BlockPrototype[]): void;
        export function removeBlock(opcode: string): void;
        export function removeBlocks(opcodes: string[]): void;
        
        export function getVmInstance(): type.VmInstance;
        export function getGuiDocument(): Document;
        export function getGuiInstance(): type.GuiInstance;
        export function getBlockInstance(): type.BlockInstance;
        export function getStageCanvas(): HTMLCanvasElement;

        export function getSettings(id: string): any;

        export function registerGlobalFunction(name: string, func: Function): void;
        export function unregisterGlobalFunction(name: string): void;
        export function callGlobalFunction(name: string, ...args: any[]): any;

        export function migrateChangeBlock(targets: Object, srcBlockId: string, dstBlockId: string): void;
    }

    export namespace error {
        const ERROR_UNAVAILABLE_EXTENSION = 0x90;
        const ERROR_CIRCULAR_REQUIREMENT = 0x91;
    }

    export class MigrationHelper {
        constructor();
        addVersionMigration(srcVer: string, dstVer: string, migrationScript: Function): void;
        migrationFromVersion(srcVer: string, dstVer: string, projectData: type.Project): void;
    }

    enum LoadMode {
        UNLOAD = 0,
        INITIATIVE_LOAD = 1,
        PASSIVE_LOAD = 2
    }

    interface ExtensionLoadInfo {
        id: string;
        mode: LoadMode;
    }

    export class ExtensionManager {
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

    export const extensionManager: ExtensionManager;

    export class Extension {
        constructor();
        onInit?(): void;
        onUninit?(): void;
        beforeProjectLoad?(data: any, extensions: any): void;
        beforeProjectSave?(data: any): void;
    }

    export class CompatibleExtension extends Extension {
        constructor();
        onInit?(): void;
    }
}

