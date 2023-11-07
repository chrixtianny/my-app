import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
    collectionName: 'admin_permissions';
    info: {
        name: 'Permission';
        description: '';
        singularName: 'permission';
        pluralName: 'permissions';
        displayName: 'Permission';
    };
    pluginOptions: {
        'content-manager': {
            visible: false;
        };
        'content-type-builder': {
            visible: false;
        };
    };
    attributes: {
        action: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMaxLength<{
                minLength: 1;
            }>;
        actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
        subject: Attribute.String &
            Attribute.SetMinMaxLength<{
                minLength: 1;
            }>;
        properties: Attribute.JSON & Attribute.DefaultTo<{}>;
        conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
        role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
        createdAt: Attribute.DateTime;
        updatedAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'admin::permission', 'oneToOne', 'admin::user'> & Attribute.Private;
        updatedBy: Attribute.Relation<'admin::permission', 'oneToOne', 'admin::user'> & Attribute.Private;
    };
}

export interface AdminUser extends Schema.CollectionType {
    collectionName: 'admin_users';
    info: {
        name: 'User';
        description: '';
        singularName: 'user';
        pluralName: 'users';
        displayName: 'User';
    };
    pluginOptions: {
        'content-manager': {
            visible: false;
        };
        'content-type-builder': {
            visible: false;
        };
    };
    attributes: {
        firstname: Attribute.String &
            Attribute.SetMinMaxLength<{
                minLength: 1;
            }>;
        lastname: Attribute.String &
            Attribute.SetMinMaxLength<{
                minLength: 1;
            }>;
        username: Attribute.String;
        email: Attribute.Email &
            Attribute.Required &
            Attribute.Private &
            Attribute.Unique &
            Attribute.SetMinMaxLength<{
                minLength: 6;
            }>;
        password: Attribute.Password &
            Attribute.Private &
            Attribute.SetMinMaxLength<{
                minLength: 6;
            }>;
        resetPasswordToken: Attribute.String & Attribute.Private;
        registrationToken: Attribute.String & Attribute.Private;
        isActive: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
        roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> & Attribute.Private;
        blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
        preferedLanguage: Attribute.String;
        createdAt: Attribute.DateTime;
        updatedAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> & Attribute.Private;
        updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> & Attribute.Private;
    };
}

export interface AdminRole extends Schema.CollectionType {
    collectionName: 'admin_roles';
    info: {
        name: 'Role';
        description: '';
        singularName: 'role';
        pluralName: 'roles';
        displayName: 'Role';
    };
    pluginOptions: {
        'content-manager': {
            visible: false;
        };
        'content-type-builder': {
            visible: false;
        };
    };
    attributes: {
        name: Attribute.String &
            Attribute.Required &
            Attribute.Unique &
            Attribute.SetMinMaxLength<{
                minLength: 1;
            }>;
        code: Attribute.String &
            Attribute.Required &
            Attribute.Unique &
            Attribute.SetMinMaxLength<{
                minLength: 1;
            }>;
        description: Attribute.String;
        users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
        permissions: Attribute.Relation<'admin::role', 'oneToMany', 'admin::permission'>;
        createdAt: Attribute.DateTime;
        updatedAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> & Attribute.Private;
        updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> & Attribute.Private;
    };
}

export interface AdminApiToken extends Schema.CollectionType {
    collectionName: 'strapi_api_tokens';
    info: {
        name: 'Api Token';
        singularName: 'api-token';
        pluralName: 'api-tokens';
        displayName: 'Api Token';
        description: '';
    };
    pluginOptions: {
        'content-manager': {
            visible: false;
        };
        'content-type-builder': {
            visible: false;
        };
    };
    attributes: {
        name: Attribute.String &
            Attribute.Required &
            Attribute.Unique &
            Attribute.SetMinMaxLength<{
                minLength: 1;
            }>;
        description: Attribute.String &
            Attribute.SetMinMaxLength<{
                minLength: 1;
            }> &
            Attribute.DefaultTo<''>;
        type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> & Attribute.Required & Attribute.DefaultTo<'read-only'>;
        accessKey: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMaxLength<{
                minLength: 1;
            }>;
        lastUsedAt: Attribute.DateTime;
        permissions: Attribute.Relation<'admin::api-token', 'oneToMany', 'admin::api-token-permission'>;
        expiresAt: Attribute.DateTime;
        lifespan: Attribute.BigInteger;
        createdAt: Attribute.DateTime;
        updatedAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'admin::api-token', 'oneToOne', 'admin::user'> & Attribute.Private;
        updatedBy: Attribute.Relation<'admin::api-token', 'oneToOne', 'admin::user'> & Attribute.Private;
    };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
    collectionName: 'strapi_api_token_permissions';
    info: {
        name: 'API Token Permission';
        description: '';
        singularName: 'api-token-permission';
        pluralName: 'api-token-permissions';
        displayName: 'API Token Permission';
    };
    pluginOptions: {
        'content-manager': {
            visible: false;
        };
        'content-type-builder': {
            visible: false;
        };
    };
    attributes: {
        action: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMaxLength<{
                minLength: 1;
            }>;
        token: Attribute.Relation<'admin::api-token-permission', 'manyToOne', 'admin::api-token'>;
        createdAt: Attribute.DateTime;
        updatedAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'admin::api-token-permission', 'oneToOne', 'admin::user'> & Attribute.Private;
        updatedBy: Attribute.Relation<'admin::api-token-permission', 'oneToOne', 'admin::user'> & Attribute.Private;
    };
}

export interface AdminTransferToken extends Schema.CollectionType {
    collectionName: 'strapi_transfer_tokens';
    info: {
        name: 'Transfer Token';
        singularName: 'transfer-token';
        pluralName: 'transfer-tokens';
        displayName: 'Transfer Token';
        description: '';
    };
    pluginOptions: {
        'content-manager': {
            visible: false;
        };
        'content-type-builder': {
            visible: false;
        };
    };
    attributes: {
        name: Attribute.String &
            Attribute.Required &
            Attribute.Unique &
            Attribute.SetMinMaxLength<{
                minLength: 1;
            }>;
        description: Attribute.String &
            Attribute.SetMinMaxLength<{
                minLength: 1;
            }> &
            Attribute.DefaultTo<''>;
        accessKey: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMaxLength<{
                minLength: 1;
            }>;
        lastUsedAt: Attribute.DateTime;
        permissions: Attribute.Relation<'admin::transfer-token', 'oneToMany', 'admin::transfer-token-permission'>;
        expiresAt: Attribute.DateTime;
        lifespan: Attribute.BigInteger;
        createdAt: Attribute.DateTime;
        updatedAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'admin::transfer-token', 'oneToOne', 'admin::user'> & Attribute.Private;
        updatedBy: Attribute.Relation<'admin::transfer-token', 'oneToOne', 'admin::user'> & Attribute.Private;
    };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
    collectionName: 'strapi_transfer_token_permissions';
    info: {
        name: 'Transfer Token Permission';
        description: '';
        singularName: 'transfer-token-permission';
        pluralName: 'transfer-token-permissions';
        displayName: 'Transfer Token Permission';
    };
    pluginOptions: {
        'content-manager': {
            visible: false;
        };
        'content-type-builder': {
            visible: false;
        };
    };
    attributes: {
        action: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMaxLength<{
                minLength: 1;
            }>;
        token: Attribute.Relation<'admin::transfer-token-permission', 'manyToOne', 'admin::transfer-token'>;
        createdAt: Attribute.DateTime;
        updatedAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'admin::transfer-token-permission', 'oneToOne', 'admin::user'> & Attribute.Private;
        updatedBy: Attribute.Relation<'admin::transfer-token-permission', 'oneToOne', 'admin::user'> & Attribute.Private;
    };
}

export interface PluginUploadFile extends Schema.CollectionType {
    collectionName: 'files';
    info: {
        singularName: 'file';
        pluralName: 'files';
        displayName: 'File';
        description: '';
    };
    pluginOptions: {
        'content-manager': {
            visible: false;
        };
        'content-type-builder': {
            visible: false;
        };
    };
    attributes: {
        name: Attribute.String & Attribute.Required;
        alternativeText: Attribute.String;
        caption: Attribute.String;
        width: Attribute.Integer;
        height: Attribute.Integer;
        formats: Attribute.JSON;
        hash: Attribute.String & Attribute.Required;
        ext: Attribute.String;
        mime: Attribute.String & Attribute.Required;
        size: Attribute.Decimal & Attribute.Required;
        url: Attribute.String & Attribute.Required;
        previewUrl: Attribute.String;
        provider: Attribute.String & Attribute.Required;
        provider_metadata: Attribute.JSON;
        related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
        folder: Attribute.Relation<'plugin::upload.file', 'manyToOne', 'plugin::upload.folder'> & Attribute.Private;
        folderPath: Attribute.String &
            Attribute.Required &
            Attribute.Private &
            Attribute.SetMinMax<{
                min: 1;
            }>;
        createdAt: Attribute.DateTime;
        updatedAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'plugin::upload.file', 'oneToOne', 'admin::user'> & Attribute.Private;
        updatedBy: Attribute.Relation<'plugin::upload.file', 'oneToOne', 'admin::user'> & Attribute.Private;
    };
}

export interface PluginUploadFolder extends Schema.CollectionType {
    collectionName: 'upload_folders';
    info: {
        singularName: 'folder';
        pluralName: 'folders';
        displayName: 'Folder';
    };
    pluginOptions: {
        'content-manager': {
            visible: false;
        };
        'content-type-builder': {
            visible: false;
        };
    };
    attributes: {
        name: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMax<{
                min: 1;
            }>;
        pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
        parent: Attribute.Relation<'plugin::upload.folder', 'manyToOne', 'plugin::upload.folder'>;
        children: Attribute.Relation<'plugin::upload.folder', 'oneToMany', 'plugin::upload.folder'>;
        files: Attribute.Relation<'plugin::upload.folder', 'oneToMany', 'plugin::upload.file'>;
        path: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMax<{
                min: 1;
            }>;
        createdAt: Attribute.DateTime;
        updatedAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'plugin::upload.folder', 'oneToOne', 'admin::user'> & Attribute.Private;
        updatedBy: Attribute.Relation<'plugin::upload.folder', 'oneToOne', 'admin::user'> & Attribute.Private;
    };
}

export interface PluginI18NLocale extends Schema.CollectionType {
    collectionName: 'i18n_locale';
    info: {
        singularName: 'locale';
        pluralName: 'locales';
        collectionName: 'locales';
        displayName: 'Locale';
        description: '';
    };
    options: {
        draftAndPublish: false;
    };
    pluginOptions: {
        'content-manager': {
            visible: false;
        };
        'content-type-builder': {
            visible: false;
        };
    };
    attributes: {
        name: Attribute.String &
            Attribute.SetMinMax<{
                min: 1;
                max: 50;
            }>;
        code: Attribute.String & Attribute.Unique;
        createdAt: Attribute.DateTime;
        updatedAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'plugin::i18n.locale', 'oneToOne', 'admin::user'> & Attribute.Private;
        updatedBy: Attribute.Relation<'plugin::i18n.locale', 'oneToOne', 'admin::user'> & Attribute.Private;
    };
}

export interface PluginUsersPermissionsPermission extends Schema.CollectionType {
    collectionName: 'up_permissions';
    info: {
        name: 'permission';
        description: '';
        singularName: 'permission';
        pluralName: 'permissions';
        displayName: 'Permission';
    };
    pluginOptions: {
        'content-manager': {
            visible: false;
        };
        'content-type-builder': {
            visible: false;
        };
    };
    attributes: {
        action: Attribute.String & Attribute.Required;
        role: Attribute.Relation<'plugin::users-permissions.permission', 'manyToOne', 'plugin::users-permissions.role'>;
        createdAt: Attribute.DateTime;
        updatedAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'plugin::users-permissions.permission', 'oneToOne', 'admin::user'> & Attribute.Private;
        updatedBy: Attribute.Relation<'plugin::users-permissions.permission', 'oneToOne', 'admin::user'> & Attribute.Private;
    };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
    collectionName: 'up_roles';
    info: {
        name: 'role';
        description: '';
        singularName: 'role';
        pluralName: 'roles';
        displayName: 'Role';
    };
    pluginOptions: {
        'content-manager': {
            visible: false;
        };
        'content-type-builder': {
            visible: false;
        };
    };
    attributes: {
        name: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMaxLength<{
                minLength: 3;
            }>;
        description: Attribute.String;
        type: Attribute.String & Attribute.Unique;
        permissions: Attribute.Relation<'plugin::users-permissions.role', 'oneToMany', 'plugin::users-permissions.permission'>;
        users: Attribute.Relation<'plugin::users-permissions.role', 'oneToMany', 'plugin::users-permissions.user'>;
        createdAt: Attribute.DateTime;
        updatedAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'plugin::users-permissions.role', 'oneToOne', 'admin::user'> & Attribute.Private;
        updatedBy: Attribute.Relation<'plugin::users-permissions.role', 'oneToOne', 'admin::user'> & Attribute.Private;
    };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
    collectionName: 'up_users';
    info: {
        name: 'user';
        description: '';
        singularName: 'user';
        pluralName: 'users';
        displayName: 'User';
    };
    options: {
        draftAndPublish: false;
    };
    attributes: {
        username: Attribute.String &
            Attribute.Required &
            Attribute.Unique &
            Attribute.SetMinMaxLength<{
                minLength: 3;
            }>;
        email: Attribute.Email &
            Attribute.Required &
            Attribute.SetMinMaxLength<{
                minLength: 6;
            }>;
        provider: Attribute.String;
        password: Attribute.Password &
            Attribute.Private &
            Attribute.SetMinMaxLength<{
                minLength: 6;
            }>;
        resetPasswordToken: Attribute.String & Attribute.Private;
        confirmationToken: Attribute.String & Attribute.Private;
        confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
        blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
        role: Attribute.Relation<'plugin::users-permissions.user', 'manyToOne', 'plugin::users-permissions.role'>;
        codusuario: Attribute.UID<
            undefined,
            undefined,
            {
                'uuid-format': '^[A-Z0-9]{4}$';
            }
        > &
            Attribute.CustomField<
                'plugin::strapi-advanced-uuid.uuid',
                {
                    'uuid-format': '^[A-Z0-9]{4}$';
                }
            >;
        createdAt: Attribute.DateTime;
        updatedAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'plugin::users-permissions.user', 'oneToOne', 'admin::user'> & Attribute.Private;
        updatedBy: Attribute.Relation<'plugin::users-permissions.user', 'oneToOne', 'admin::user'> & Attribute.Private;
    };
}

export interface ApiCategoriaCategoria extends Schema.CollectionType {
    collectionName: 'categorias';
    info: {
        singularName: 'categoria';
        pluralName: 'categorias';
        displayName: 'Categoria';
        description: '';
    };
    options: {
        draftAndPublish: true;
    };
    pluginOptions: {
        i18n: {
            localized: true;
        };
    };
    attributes: {
        codcategoria: Attribute.UID<
            undefined,
            undefined,
            {
                'uuid-format': '^[A-Z0-9]{3}$';
            }
        > &
            Attribute.CustomField<
                'plugin::strapi-advanced-uuid.uuid',
                {
                    'uuid-format': '^[A-Z0-9]{3}$';
                }
            > &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: true;
                };
            }>;
        nomecategoria: Attribute.String &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: true;
                };
            }>;
        descricao: Attribute.String &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: true;
                };
            }>;
        createdAt: Attribute.DateTime;
        updatedAt: Attribute.DateTime;
        publishedAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'api::categoria.categoria', 'oneToOne', 'admin::user'> & Attribute.Private;
        updatedBy: Attribute.Relation<'api::categoria.categoria', 'oneToOne', 'admin::user'> & Attribute.Private;
        localizations: Attribute.Relation<'api::categoria.categoria', 'oneToMany', 'api::categoria.categoria'>;
        locale: Attribute.String;
    };
}

export interface ApiEnderecoEndereco extends Schema.CollectionType {
    collectionName: 'enderecos';
    info: {
        singularName: 'endereco';
        pluralName: 'enderecos';
        displayName: 'Endereco';
    };
    options: {
        draftAndPublish: true;
    };
    pluginOptions: {
        i18n: {
            localized: true;
        };
    };
    attributes: {
        cep: Attribute.Integer &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: true;
                };
            }>;
        logradouro: Attribute.String &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: true;
                };
            }>;
        num: Attribute.Integer &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: true;
                };
            }>;
        complemento: Attribute.String &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: true;
                };
            }>;
        bairro: Attribute.String &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: true;
                };
            }>;
        cidade: Attribute.String &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: true;
                };
            }>;
        estado: Attribute.String &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: true;
                };
            }>;
        pais: Attribute.String &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: true;
                };
            }>;
        usuarios: Attribute.Relation<'api::endereco.endereco', 'oneToMany', 'api::usuario.usuario'>;
        createdAt: Attribute.DateTime;
        updatedAt: Attribute.DateTime;
        publishedAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'api::endereco.endereco', 'oneToOne', 'admin::user'> & Attribute.Private;
        updatedBy: Attribute.Relation<'api::endereco.endereco', 'oneToOne', 'admin::user'> & Attribute.Private;
        localizations: Attribute.Relation<'api::endereco.endereco', 'oneToMany', 'api::endereco.endereco'>;
        locale: Attribute.String;
    };
}

export interface ApiEstoqueEstoque extends Schema.CollectionType {
    collectionName: 'estoques';
    info: {
        singularName: 'estoque';
        pluralName: 'estoques';
        displayName: 'Estoque';
        description: '';
    };
    options: {
        draftAndPublish: false;
    };
    pluginOptions: {
        i18n: {
            localized: true;
        };
    };
    attributes: {
        quantidade: Attribute.Integer &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: true;
                };
            }>;
        disponivel: Attribute.Boolean &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: false;
                };
            }> &
            Attribute.DefaultTo<true>;
        produto: Attribute.Relation<'api::estoque.estoque', 'oneToOne', 'api::produto.produto'>;
        createdAt: Attribute.DateTime;
        updatedAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'api::estoque.estoque', 'oneToOne', 'admin::user'> & Attribute.Private;
        updatedBy: Attribute.Relation<'api::estoque.estoque', 'oneToOne', 'admin::user'> & Attribute.Private;
        localizations: Attribute.Relation<'api::estoque.estoque', 'oneToMany', 'api::estoque.estoque'>;
        locale: Attribute.String;
    };
}

export interface ApiPedidoPedido extends Schema.CollectionType {
    collectionName: 'pedidos';
    info: {
        singularName: 'pedido';
        pluralName: 'pedidos';
        displayName: 'Pedido';
    };
    options: {
        draftAndPublish: false;
    };
    pluginOptions: {
        i18n: {
            localized: true;
        };
    };
    attributes: {
        idpedido: Attribute.UID<
            undefined,
            undefined,
            {
                'uuid-format': '^[A-Z0-9]{5}$';
            }
        > &
            Attribute.CustomField<
                'plugin::strapi-advanced-uuid.uuid',
                {
                    'uuid-format': '^[A-Z0-9]{5}$';
                }
            > &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: true;
                };
            }>;
        valorpedido: Attribute.Decimal &
            Attribute.Required &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: true;
                };
            }>;
        datapedido: Attribute.DateTime &
            Attribute.Required &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: true;
                };
            }>;
        endereco: Attribute.Relation<'api::pedido.pedido', 'oneToOne', 'api::endereco.endereco'>;
        produtos: Attribute.Relation<'api::pedido.pedido', 'oneToMany', 'api::produto.produto'>;
        usuario: Attribute.Relation<'api::pedido.pedido', 'oneToOne', 'api::usuario.usuario'>;
        categorias: Attribute.Relation<'api::pedido.pedido', 'oneToMany', 'api::categoria.categoria'>;
        createdAt: Attribute.DateTime;
        updatedAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'api::pedido.pedido', 'oneToOne', 'admin::user'> & Attribute.Private;
        updatedBy: Attribute.Relation<'api::pedido.pedido', 'oneToOne', 'admin::user'> & Attribute.Private;
        localizations: Attribute.Relation<'api::pedido.pedido', 'oneToMany', 'api::pedido.pedido'>;
        locale: Attribute.String;
    };
}

export interface ApiProdutoProduto extends Schema.CollectionType {
    collectionName: 'produtos';
    info: {
        singularName: 'produto';
        pluralName: 'produtos';
        displayName: 'Produto';
        description: '';
    };
    options: {
        draftAndPublish: false;
    };
    pluginOptions: {
        i18n: {
            localized: true;
        };
    };
    attributes: {
        nomeprod: Attribute.String &
            Attribute.Required &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: true;
                };
            }>;
        descricao: Attribute.String &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: true;
                };
            }>;
        imagemprod: Attribute.Media &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: true;
                };
            }>;
        precoprod: Attribute.Decimal &
            Attribute.Required &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: true;
                };
            }>;
        categoria: Attribute.Relation<'api::produto.produto', 'oneToOne', 'api::categoria.categoria'>;
        codproduto: Attribute.UID<
            undefined,
            undefined,
            {
                'uuid-format': '^[A-Z0-9]{4}$';
            }
        > &
            Attribute.CustomField<
                'plugin::strapi-advanced-uuid.uuid',
                {
                    'uuid-format': '^[A-Z0-9]{4}$';
                }
            > &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: true;
                };
            }>;
        estoque: Attribute.Relation<'api::produto.produto', 'oneToOne', 'api::estoque.estoque'>;
        createdAt: Attribute.DateTime;
        updatedAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'api::produto.produto', 'oneToOne', 'admin::user'> & Attribute.Private;
        updatedBy: Attribute.Relation<'api::produto.produto', 'oneToOne', 'admin::user'> & Attribute.Private;
        localizations: Attribute.Relation<'api::produto.produto', 'oneToMany', 'api::produto.produto'>;
        locale: Attribute.String;
    };
}

export interface ApiUsuarioUsuario extends Schema.CollectionType {
    collectionName: 'usuarios';
    info: {
        singularName: 'usuario';
        pluralName: 'usuarios';
        displayName: 'Usu\u00E1rio';
        description: '';
    };
    options: {
        draftAndPublish: true;
    };
    pluginOptions: {
        i18n: {
            localized: true;
        };
    };
    attributes: {
        nome: Attribute.String &
            Attribute.Required &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: true;
                };
            }>;
        email: Attribute.Email &
            Attribute.Required &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: true;
                };
            }>;
        senha: Attribute.Password &
            Attribute.Required &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: true;
                };
            }> &
            Attribute.SetMinMaxLength<{
                minLength: 8;
            }>;
        datanasc: Attribute.Date &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: true;
                };
            }>;
        endereco: Attribute.Relation<'api::usuario.usuario', 'manyToOne', 'api::endereco.endereco'>;
        codusuario: Attribute.UID<
            undefined,
            undefined,
            {
                'uuid-format': '^[A-Z0-9]{4}$';
            }
        > &
            Attribute.CustomField<
                'plugin::strapi-advanced-uuid.uuid',
                {
                    'uuid-format': '^[A-Z0-9]{4}$';
                }
            > &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: true;
                };
            }>;
        createdAt: Attribute.DateTime;
        updatedAt: Attribute.DateTime;
        publishedAt: Attribute.DateTime;
        createdBy: Attribute.Relation<'api::usuario.usuario', 'oneToOne', 'admin::user'> & Attribute.Private;
        updatedBy: Attribute.Relation<'api::usuario.usuario', 'oneToOne', 'admin::user'> & Attribute.Private;
        localizations: Attribute.Relation<'api::usuario.usuario', 'oneToMany', 'api::usuario.usuario'>;
        locale: Attribute.String;
    };
}

declare module '@strapi/types' {
    export module Shared {
        export interface ContentTypes {
            'admin::permission': AdminPermission;
            'admin::user': AdminUser;
            'admin::role': AdminRole;
            'admin::api-token': AdminApiToken;
            'admin::api-token-permission': AdminApiTokenPermission;
            'admin::transfer-token': AdminTransferToken;
            'admin::transfer-token-permission': AdminTransferTokenPermission;
            'plugin::upload.file': PluginUploadFile;
            'plugin::upload.folder': PluginUploadFolder;
            'plugin::i18n.locale': PluginI18NLocale;
            'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
            'plugin::users-permissions.role': PluginUsersPermissionsRole;
            'plugin::users-permissions.user': PluginUsersPermissionsUser;
            'api::categoria.categoria': ApiCategoriaCategoria;
            'api::endereco.endereco': ApiEnderecoEndereco;
            'api::estoque.estoque': ApiEstoqueEstoque;
            'api::pedido.pedido': ApiPedidoPedido;
            'api::produto.produto': ApiProdutoProduto;
            'api::usuario.usuario': ApiUsuarioUsuario;
        }
    }
}
