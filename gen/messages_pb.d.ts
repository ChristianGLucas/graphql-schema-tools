// package: christiangeorgelucas.graphql_schema_tools
// file: messages.proto

import * as jspb from "google-protobuf";

export class Location extends jspb.Message {
  getLine(): number;
  setLine(value: number): void;

  getColumn(): number;
  setColumn(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Location.AsObject;
  static toObject(includeInstance: boolean, msg: Location): Location.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Location, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Location;
  static deserializeBinaryFromReader(message: Location, reader: jspb.BinaryReader): Location;
}

export namespace Location {
  export type AsObject = {
    line: number,
    column: number,
  }
}

export class GraphQLError extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): void;

  clearLocationsList(): void;
  getLocationsList(): Array<Location>;
  setLocationsList(value: Array<Location>): void;
  addLocations(value?: Location, index?: number): Location;

  getPath(): string;
  setPath(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GraphQLError.AsObject;
  static toObject(includeInstance: boolean, msg: GraphQLError): GraphQLError.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GraphQLError, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GraphQLError;
  static deserializeBinaryFromReader(message: GraphQLError, reader: jspb.BinaryReader): GraphQLError;
}

export namespace GraphQLError {
  export type AsObject = {
    message: string,
    locationsList: Array<Location.AsObject>,
    path: string,
  }
}

export class SchemaInput extends jspb.Message {
  getSchema(): string;
  setSchema(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SchemaInput.AsObject;
  static toObject(includeInstance: boolean, msg: SchemaInput): SchemaInput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SchemaInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SchemaInput;
  static deserializeBinaryFromReader(message: SchemaInput, reader: jspb.BinaryReader): SchemaInput;
}

export namespace SchemaInput {
  export type AsObject = {
    schema: string,
  }
}

export class SchemaDefinitionSummary extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getAstKind(): string;
  setAstKind(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SchemaDefinitionSummary.AsObject;
  static toObject(includeInstance: boolean, msg: SchemaDefinitionSummary): SchemaDefinitionSummary.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SchemaDefinitionSummary, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SchemaDefinitionSummary;
  static deserializeBinaryFromReader(message: SchemaDefinitionSummary, reader: jspb.BinaryReader): SchemaDefinitionSummary;
}

export namespace SchemaDefinitionSummary {
  export type AsObject = {
    name: string,
    astKind: string,
  }
}

export class ParseSchemaResult extends jspb.Message {
  getValid(): boolean;
  setValid(value: boolean): void;

  clearErrorsList(): void;
  getErrorsList(): Array<GraphQLError>;
  setErrorsList(value: Array<GraphQLError>): void;
  addErrors(value?: GraphQLError, index?: number): GraphQLError;

  clearDefinitionsList(): void;
  getDefinitionsList(): Array<SchemaDefinitionSummary>;
  setDefinitionsList(value: Array<SchemaDefinitionSummary>): void;
  addDefinitions(value?: SchemaDefinitionSummary, index?: number): SchemaDefinitionSummary;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ParseSchemaResult.AsObject;
  static toObject(includeInstance: boolean, msg: ParseSchemaResult): ParseSchemaResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ParseSchemaResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ParseSchemaResult;
  static deserializeBinaryFromReader(message: ParseSchemaResult, reader: jspb.BinaryReader): ParseSchemaResult;
}

export namespace ParseSchemaResult {
  export type AsObject = {
    valid: boolean,
    errorsList: Array<GraphQLError.AsObject>,
    definitionsList: Array<SchemaDefinitionSummary.AsObject>,
  }
}

export class ValidateSchemaResult extends jspb.Message {
  getValid(): boolean;
  setValid(value: boolean): void;

  clearErrorsList(): void;
  getErrorsList(): Array<GraphQLError>;
  setErrorsList(value: Array<GraphQLError>): void;
  addErrors(value?: GraphQLError, index?: number): GraphQLError;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ValidateSchemaResult.AsObject;
  static toObject(includeInstance: boolean, msg: ValidateSchemaResult): ValidateSchemaResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ValidateSchemaResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ValidateSchemaResult;
  static deserializeBinaryFromReader(message: ValidateSchemaResult, reader: jspb.BinaryReader): ValidateSchemaResult;
}

export namespace ValidateSchemaResult {
  export type AsObject = {
    valid: boolean,
    errorsList: Array<GraphQLError.AsObject>,
  }
}

export class QueryInput extends jspb.Message {
  getQuery(): string;
  setQuery(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryInput.AsObject;
  static toObject(includeInstance: boolean, msg: QueryInput): QueryInput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryInput;
  static deserializeBinaryFromReader(message: QueryInput, reader: jspb.BinaryReader): QueryInput;
}

export namespace QueryInput {
  export type AsObject = {
    query: string,
  }
}

export class OperationSummary extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getOperationType(): string;
  setOperationType(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OperationSummary.AsObject;
  static toObject(includeInstance: boolean, msg: OperationSummary): OperationSummary.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: OperationSummary, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OperationSummary;
  static deserializeBinaryFromReader(message: OperationSummary, reader: jspb.BinaryReader): OperationSummary;
}

export namespace OperationSummary {
  export type AsObject = {
    name: string,
    operationType: string,
  }
}

export class ParseQueryResult extends jspb.Message {
  getValid(): boolean;
  setValid(value: boolean): void;

  clearErrorsList(): void;
  getErrorsList(): Array<GraphQLError>;
  setErrorsList(value: Array<GraphQLError>): void;
  addErrors(value?: GraphQLError, index?: number): GraphQLError;

  clearOperationsList(): void;
  getOperationsList(): Array<OperationSummary>;
  setOperationsList(value: Array<OperationSummary>): void;
  addOperations(value?: OperationSummary, index?: number): OperationSummary;

  clearFragmentNamesList(): void;
  getFragmentNamesList(): Array<string>;
  setFragmentNamesList(value: Array<string>): void;
  addFragmentNames(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ParseQueryResult.AsObject;
  static toObject(includeInstance: boolean, msg: ParseQueryResult): ParseQueryResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ParseQueryResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ParseQueryResult;
  static deserializeBinaryFromReader(message: ParseQueryResult, reader: jspb.BinaryReader): ParseQueryResult;
}

export namespace ParseQueryResult {
  export type AsObject = {
    valid: boolean,
    errorsList: Array<GraphQLError.AsObject>,
    operationsList: Array<OperationSummary.AsObject>,
    fragmentNamesList: Array<string>,
  }
}

export class ValidateQueryInput extends jspb.Message {
  getSchema(): string;
  setSchema(value: string): void;

  getQuery(): string;
  setQuery(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ValidateQueryInput.AsObject;
  static toObject(includeInstance: boolean, msg: ValidateQueryInput): ValidateQueryInput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ValidateQueryInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ValidateQueryInput;
  static deserializeBinaryFromReader(message: ValidateQueryInput, reader: jspb.BinaryReader): ValidateQueryInput;
}

export namespace ValidateQueryInput {
  export type AsObject = {
    schema: string,
    query: string,
  }
}

export class ValidateQueryResult extends jspb.Message {
  getValid(): boolean;
  setValid(value: boolean): void;

  clearErrorsList(): void;
  getErrorsList(): Array<GraphQLError>;
  setErrorsList(value: Array<GraphQLError>): void;
  addErrors(value?: GraphQLError, index?: number): GraphQLError;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ValidateQueryResult.AsObject;
  static toObject(includeInstance: boolean, msg: ValidateQueryResult): ValidateQueryResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ValidateQueryResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ValidateQueryResult;
  static deserializeBinaryFromReader(message: ValidateQueryResult, reader: jspb.BinaryReader): ValidateQueryResult;
}

export namespace ValidateQueryResult {
  export type AsObject = {
    valid: boolean,
    errorsList: Array<GraphQLError.AsObject>,
  }
}

export class TypeSummary extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getKind(): string;
  setKind(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TypeSummary.AsObject;
  static toObject(includeInstance: boolean, msg: TypeSummary): TypeSummary.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TypeSummary, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TypeSummary;
  static deserializeBinaryFromReader(message: TypeSummary, reader: jspb.BinaryReader): TypeSummary;
}

export namespace TypeSummary {
  export type AsObject = {
    name: string,
    kind: string,
    description: string,
  }
}

export class ListTypesResult extends jspb.Message {
  getValid(): boolean;
  setValid(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  clearTypesList(): void;
  getTypesList(): Array<TypeSummary>;
  setTypesList(value: Array<TypeSummary>): void;
  addTypes(value?: TypeSummary, index?: number): TypeSummary;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListTypesResult.AsObject;
  static toObject(includeInstance: boolean, msg: ListTypesResult): ListTypesResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListTypesResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListTypesResult;
  static deserializeBinaryFromReader(message: ListTypesResult, reader: jspb.BinaryReader): ListTypesResult;
}

export namespace ListTypesResult {
  export type AsObject = {
    valid: boolean,
    error: string,
    typesList: Array<TypeSummary.AsObject>,
  }
}

export class ArgInfo extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getType(): string;
  setType(value: string): void;

  getHasDefaultValue(): boolean;
  setHasDefaultValue(value: boolean): void;

  getDefaultValueJson(): string;
  setDefaultValueJson(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ArgInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ArgInfo): ArgInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ArgInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ArgInfo;
  static deserializeBinaryFromReader(message: ArgInfo, reader: jspb.BinaryReader): ArgInfo;
}

export namespace ArgInfo {
  export type AsObject = {
    name: string,
    type: string,
    hasDefaultValue: boolean,
    defaultValueJson: string,
    description: string,
  }
}

export class FieldInfo extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getType(): string;
  setType(value: string): void;

  getNullable(): boolean;
  setNullable(value: boolean): void;

  clearArgsList(): void;
  getArgsList(): Array<ArgInfo>;
  setArgsList(value: Array<ArgInfo>): void;
  addArgs(value?: ArgInfo, index?: number): ArgInfo;

  getDescription(): string;
  setDescription(value: string): void;

  getIsDeprecated(): boolean;
  setIsDeprecated(value: boolean): void;

  getDeprecationReason(): string;
  setDeprecationReason(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FieldInfo.AsObject;
  static toObject(includeInstance: boolean, msg: FieldInfo): FieldInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FieldInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FieldInfo;
  static deserializeBinaryFromReader(message: FieldInfo, reader: jspb.BinaryReader): FieldInfo;
}

export namespace FieldInfo {
  export type AsObject = {
    name: string,
    type: string,
    nullable: boolean,
    argsList: Array<ArgInfo.AsObject>,
    description: string,
    isDeprecated: boolean,
    deprecationReason: string,
  }
}

export class GetTypeFieldsInput extends jspb.Message {
  getSchema(): string;
  setSchema(value: string): void;

  getTypeName(): string;
  setTypeName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTypeFieldsInput.AsObject;
  static toObject(includeInstance: boolean, msg: GetTypeFieldsInput): GetTypeFieldsInput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTypeFieldsInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTypeFieldsInput;
  static deserializeBinaryFromReader(message: GetTypeFieldsInput, reader: jspb.BinaryReader): GetTypeFieldsInput;
}

export namespace GetTypeFieldsInput {
  export type AsObject = {
    schema: string,
    typeName: string,
  }
}

export class GetTypeFieldsResult extends jspb.Message {
  getValid(): boolean;
  setValid(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  clearFieldsList(): void;
  getFieldsList(): Array<FieldInfo>;
  setFieldsList(value: Array<FieldInfo>): void;
  addFields(value?: FieldInfo, index?: number): FieldInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTypeFieldsResult.AsObject;
  static toObject(includeInstance: boolean, msg: GetTypeFieldsResult): GetTypeFieldsResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTypeFieldsResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTypeFieldsResult;
  static deserializeBinaryFromReader(message: GetTypeFieldsResult, reader: jspb.BinaryReader): GetTypeFieldsResult;
}

export namespace GetTypeFieldsResult {
  export type AsObject = {
    valid: boolean,
    error: string,
    fieldsList: Array<FieldInfo.AsObject>,
  }
}

export class ListOperationFieldsResult extends jspb.Message {
  getValid(): boolean;
  setValid(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  clearFieldsList(): void;
  getFieldsList(): Array<FieldInfo>;
  setFieldsList(value: Array<FieldInfo>): void;
  addFields(value?: FieldInfo, index?: number): FieldInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListOperationFieldsResult.AsObject;
  static toObject(includeInstance: boolean, msg: ListOperationFieldsResult): ListOperationFieldsResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListOperationFieldsResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListOperationFieldsResult;
  static deserializeBinaryFromReader(message: ListOperationFieldsResult, reader: jspb.BinaryReader): ListOperationFieldsResult;
}

export namespace ListOperationFieldsResult {
  export type AsObject = {
    valid: boolean,
    error: string,
    fieldsList: Array<FieldInfo.AsObject>,
  }
}

export class EnumValueInfo extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getIsDeprecated(): boolean;
  setIsDeprecated(value: boolean): void;

  getDeprecationReason(): string;
  setDeprecationReason(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EnumValueInfo.AsObject;
  static toObject(includeInstance: boolean, msg: EnumValueInfo): EnumValueInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EnumValueInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EnumValueInfo;
  static deserializeBinaryFromReader(message: EnumValueInfo, reader: jspb.BinaryReader): EnumValueInfo;
}

export namespace EnumValueInfo {
  export type AsObject = {
    name: string,
    description: string,
    isDeprecated: boolean,
    deprecationReason: string,
  }
}

export class ListEnumValuesInput extends jspb.Message {
  getSchema(): string;
  setSchema(value: string): void;

  getTypeName(): string;
  setTypeName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListEnumValuesInput.AsObject;
  static toObject(includeInstance: boolean, msg: ListEnumValuesInput): ListEnumValuesInput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListEnumValuesInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListEnumValuesInput;
  static deserializeBinaryFromReader(message: ListEnumValuesInput, reader: jspb.BinaryReader): ListEnumValuesInput;
}

export namespace ListEnumValuesInput {
  export type AsObject = {
    schema: string,
    typeName: string,
  }
}

export class ListEnumValuesResult extends jspb.Message {
  getValid(): boolean;
  setValid(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  clearValuesList(): void;
  getValuesList(): Array<EnumValueInfo>;
  setValuesList(value: Array<EnumValueInfo>): void;
  addValues(value?: EnumValueInfo, index?: number): EnumValueInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListEnumValuesResult.AsObject;
  static toObject(includeInstance: boolean, msg: ListEnumValuesResult): ListEnumValuesResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListEnumValuesResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListEnumValuesResult;
  static deserializeBinaryFromReader(message: ListEnumValuesResult, reader: jspb.BinaryReader): ListEnumValuesResult;
}

export namespace ListEnumValuesResult {
  export type AsObject = {
    valid: boolean,
    error: string,
    valuesList: Array<EnumValueInfo.AsObject>,
  }
}

export class ListInterfaceImplementationsInput extends jspb.Message {
  getSchema(): string;
  setSchema(value: string): void;

  getInterfaceName(): string;
  setInterfaceName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListInterfaceImplementationsInput.AsObject;
  static toObject(includeInstance: boolean, msg: ListInterfaceImplementationsInput): ListInterfaceImplementationsInput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListInterfaceImplementationsInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListInterfaceImplementationsInput;
  static deserializeBinaryFromReader(message: ListInterfaceImplementationsInput, reader: jspb.BinaryReader): ListInterfaceImplementationsInput;
}

export namespace ListInterfaceImplementationsInput {
  export type AsObject = {
    schema: string,
    interfaceName: string,
  }
}

export class ImplementingType extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getKind(): string;
  setKind(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ImplementingType.AsObject;
  static toObject(includeInstance: boolean, msg: ImplementingType): ImplementingType.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ImplementingType, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ImplementingType;
  static deserializeBinaryFromReader(message: ImplementingType, reader: jspb.BinaryReader): ImplementingType;
}

export namespace ImplementingType {
  export type AsObject = {
    name: string,
    kind: string,
  }
}

export class ListInterfaceImplementationsResult extends jspb.Message {
  getValid(): boolean;
  setValid(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  clearImplementationsList(): void;
  getImplementationsList(): Array<ImplementingType>;
  setImplementationsList(value: Array<ImplementingType>): void;
  addImplementations(value?: ImplementingType, index?: number): ImplementingType;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListInterfaceImplementationsResult.AsObject;
  static toObject(includeInstance: boolean, msg: ListInterfaceImplementationsResult): ListInterfaceImplementationsResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListInterfaceImplementationsResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListInterfaceImplementationsResult;
  static deserializeBinaryFromReader(message: ListInterfaceImplementationsResult, reader: jspb.BinaryReader): ListInterfaceImplementationsResult;
}

export namespace ListInterfaceImplementationsResult {
  export type AsObject = {
    valid: boolean,
    error: string,
    implementationsList: Array<ImplementingType.AsObject>,
  }
}

export class ListUnionMembersInput extends jspb.Message {
  getSchema(): string;
  setSchema(value: string): void;

  getUnionName(): string;
  setUnionName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListUnionMembersInput.AsObject;
  static toObject(includeInstance: boolean, msg: ListUnionMembersInput): ListUnionMembersInput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListUnionMembersInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListUnionMembersInput;
  static deserializeBinaryFromReader(message: ListUnionMembersInput, reader: jspb.BinaryReader): ListUnionMembersInput;
}

export namespace ListUnionMembersInput {
  export type AsObject = {
    schema: string,
    unionName: string,
  }
}

export class ListUnionMembersResult extends jspb.Message {
  getValid(): boolean;
  setValid(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  clearMembersList(): void;
  getMembersList(): Array<string>;
  setMembersList(value: Array<string>): void;
  addMembers(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListUnionMembersResult.AsObject;
  static toObject(includeInstance: boolean, msg: ListUnionMembersResult): ListUnionMembersResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListUnionMembersResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListUnionMembersResult;
  static deserializeBinaryFromReader(message: ListUnionMembersResult, reader: jspb.BinaryReader): ListUnionMembersResult;
}

export namespace ListUnionMembersResult {
  export type AsObject = {
    valid: boolean,
    error: string,
    membersList: Array<string>,
  }
}

export class PrintSchemaResult extends jspb.Message {
  getValid(): boolean;
  setValid(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  getSdl(): string;
  setSdl(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PrintSchemaResult.AsObject;
  static toObject(includeInstance: boolean, msg: PrintSchemaResult): PrintSchemaResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PrintSchemaResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PrintSchemaResult;
  static deserializeBinaryFromReader(message: PrintSchemaResult, reader: jspb.BinaryReader): PrintSchemaResult;
}

export namespace PrintSchemaResult {
  export type AsObject = {
    valid: boolean,
    error: string,
    sdl: string,
  }
}

export class PrintQueryResult extends jspb.Message {
  getValid(): boolean;
  setValid(value: boolean): void;

  clearErrorsList(): void;
  getErrorsList(): Array<GraphQLError>;
  setErrorsList(value: Array<GraphQLError>): void;
  addErrors(value?: GraphQLError, index?: number): GraphQLError;

  getFormattedQuery(): string;
  setFormattedQuery(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PrintQueryResult.AsObject;
  static toObject(includeInstance: boolean, msg: PrintQueryResult): PrintQueryResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PrintQueryResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PrintQueryResult;
  static deserializeBinaryFromReader(message: PrintQueryResult, reader: jspb.BinaryReader): PrintQueryResult;
}

export namespace PrintQueryResult {
  export type AsObject = {
    valid: boolean,
    errorsList: Array<GraphQLError.AsObject>,
    formattedQuery: string,
  }
}

export class ExtractOperationsResult extends jspb.Message {
  getValid(): boolean;
  setValid(value: boolean): void;

  clearErrorsList(): void;
  getErrorsList(): Array<GraphQLError>;
  setErrorsList(value: Array<GraphQLError>): void;
  addErrors(value?: GraphQLError, index?: number): GraphQLError;

  clearOperationsList(): void;
  getOperationsList(): Array<OperationSummary>;
  setOperationsList(value: Array<OperationSummary>): void;
  addOperations(value?: OperationSummary, index?: number): OperationSummary;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExtractOperationsResult.AsObject;
  static toObject(includeInstance: boolean, msg: ExtractOperationsResult): ExtractOperationsResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExtractOperationsResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExtractOperationsResult;
  static deserializeBinaryFromReader(message: ExtractOperationsResult, reader: jspb.BinaryReader): ExtractOperationsResult;
}

export namespace ExtractOperationsResult {
  export type AsObject = {
    valid: boolean,
    errorsList: Array<GraphQLError.AsObject>,
    operationsList: Array<OperationSummary.AsObject>,
  }
}

export class ExtractVariablesInput extends jspb.Message {
  getQuery(): string;
  setQuery(value: string): void;

  getOperationName(): string;
  setOperationName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExtractVariablesInput.AsObject;
  static toObject(includeInstance: boolean, msg: ExtractVariablesInput): ExtractVariablesInput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExtractVariablesInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExtractVariablesInput;
  static deserializeBinaryFromReader(message: ExtractVariablesInput, reader: jspb.BinaryReader): ExtractVariablesInput;
}

export namespace ExtractVariablesInput {
  export type AsObject = {
    query: string,
    operationName: string,
  }
}

export class VariableInfo extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getType(): string;
  setType(value: string): void;

  getNullable(): boolean;
  setNullable(value: boolean): void;

  getHasDefaultValue(): boolean;
  setHasDefaultValue(value: boolean): void;

  getDefaultValueJson(): string;
  setDefaultValueJson(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VariableInfo.AsObject;
  static toObject(includeInstance: boolean, msg: VariableInfo): VariableInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VariableInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VariableInfo;
  static deserializeBinaryFromReader(message: VariableInfo, reader: jspb.BinaryReader): VariableInfo;
}

export namespace VariableInfo {
  export type AsObject = {
    name: string,
    type: string,
    nullable: boolean,
    hasDefaultValue: boolean,
    defaultValueJson: string,
  }
}

export class ExtractVariablesResult extends jspb.Message {
  getValid(): boolean;
  setValid(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  clearVariablesList(): void;
  getVariablesList(): Array<VariableInfo>;
  setVariablesList(value: Array<VariableInfo>): void;
  addVariables(value?: VariableInfo, index?: number): VariableInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExtractVariablesResult.AsObject;
  static toObject(includeInstance: boolean, msg: ExtractVariablesResult): ExtractVariablesResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExtractVariablesResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExtractVariablesResult;
  static deserializeBinaryFromReader(message: ExtractVariablesResult, reader: jspb.BinaryReader): ExtractVariablesResult;
}

export namespace ExtractVariablesResult {
  export type AsObject = {
    valid: boolean,
    error: string,
    variablesList: Array<VariableInfo.AsObject>,
  }
}

export class SchemaSummaryResult extends jspb.Message {
  getValid(): boolean;
  setValid(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  getObjectCount(): number;
  setObjectCount(value: number): void;

  getInterfaceCount(): number;
  setInterfaceCount(value: number): void;

  getUnionCount(): number;
  setUnionCount(value: number): void;

  getEnumCount(): number;
  setEnumCount(value: number): void;

  getInputObjectCount(): number;
  setInputObjectCount(value: number): void;

  getScalarCount(): number;
  setScalarCount(value: number): void;

  getTotalFieldCount(): number;
  setTotalFieldCount(value: number): void;

  getHasQueryType(): boolean;
  setHasQueryType(value: boolean): void;

  getHasMutationType(): boolean;
  setHasMutationType(value: boolean): void;

  getHasSubscriptionType(): boolean;
  setHasSubscriptionType(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SchemaSummaryResult.AsObject;
  static toObject(includeInstance: boolean, msg: SchemaSummaryResult): SchemaSummaryResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SchemaSummaryResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SchemaSummaryResult;
  static deserializeBinaryFromReader(message: SchemaSummaryResult, reader: jspb.BinaryReader): SchemaSummaryResult;
}

export namespace SchemaSummaryResult {
  export type AsObject = {
    valid: boolean,
    error: string,
    objectCount: number,
    interfaceCount: number,
    unionCount: number,
    enumCount: number,
    inputObjectCount: number,
    scalarCount: number,
    totalFieldCount: number,
    hasQueryType: boolean,
    hasMutationType: boolean,
    hasSubscriptionType: boolean,
  }
}

