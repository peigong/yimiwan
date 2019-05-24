const STATUS = Symbol('Application#Status');

module.exports = {
  get Status() {
    // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
    if (!this[STATUS]) {
      this[STATUS] = {
        // 信息，服务器收到请求，需要请求者继续执行操作
        Continue:	100,	// 继续。客户端应继续其请求
        SwitchingProtocols:	101,	// 切换协议。服务器根据客户端的请求切换协议。只能切换到更高级的协议，例如，切换到HTTP的新版本协议
        Processing: 102, // 由WebDAV（RFC 2518）扩展的状态码，代表处理将被继续执行。

        // 成功，操作被成功接收并处理
        OK:	200,	// 请求成功。一般用于GET与POST请求
        Created:	201,	// 已创建。成功请求并创建了新的资源
        Accepted:	202,	// 已接受。已经接受请求，但未处理完成
        NonAuthoritativeInformation:	203,	// 非授权信息。请求成功。但返回的meta信息不在原始的服务器，而是一个副本
        NoContent:	204,	// 无内容。服务器成功处理，但未返回内容。在未更新网页的情况下，可确保浏览器继续显示当前文档
        ResetContent:	205,	// 重置内容。服务器处理成功，用户终端（例如：浏览器）应重置文档视图。可通过此返回码清除浏览器的表单域
        PartialContent:	206,	// 部分内容。服务器成功处理了部分GET请求
        MultiStatus: 207, // 由WebDAV(RFC 2518)扩展的状态码，代表之后的消息体将是一个XML消息，并且可能依照之前子请求数量的不同，包含一系列独立的响应代码。

        // 重定向，需要进一步的操作以完成请求
        MultipleChoices:	300,	// 多种选择。请求的资源可包括多个位置，相应可返回一个资源特征与地址的列表用于用户终端（例如：浏览器）选择
        MovedPermanently:	301,	// 永久移动。请求的资源已被永久的移动到新URI，返回信息会包括新的URI，浏览器会自动定向到新URI。今后任何新的请求都应使用新的URI代替
        Found:	302,	// 临时移动。与301类似。但资源只是临时被移动。客户端应继续使用原有URI
        SeeOther:	303,	// 查看其它地址。与301类似。使用GET和POST请求查看
        NotModified:	304,	// 未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源
        UseProxy:	305,	// 使用代理。所请求的资源必须通过代理访问
        Unused:	306,	// 已经被废弃的HTTP状态码
        TemporaryRedirect:	307,	// 临时重定向。与302类似。使用GET请求重定向

        // 客户端错误，请求包含语法错误或无法完成请求
        BadRequest:	400,	// 客户端请求的语法错误，服务器无法理解
        Unauthorized:	401,	// 请求要求用户的身份认证
        PaymentRequired:	402,	// 保留，将来使用
        Forbidden:	403,	// 服务器理解请求客户端的请求，但是拒绝执行此请求
        NotFound:	404,	// 服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置"您所请求的资源无法找到"的个性页面
        MethodNotAllowed:	405,	// 客户端请求中的方法被禁止
        NotAcceptable:	406,	// 服务器无法根据客户端请求的内容特性完成请求
        ProxyAuthenticationRequired:	407,	// 请求要求代理的身份认证，与401类似，但请求者应当使用代理进行授权
        RequestTimeout:	408,	// 服务器等待客户端发送的请求时间过长，超时
        Conflict:	409,	// 服务器完成客户端的PUT请求是可能返回此代码，服务器处理请求时发生了冲突
        Gone:	410,	// 客户端请求的资源已经不存在。410不同于404，如果资源以前有现在被永久删除了可使用410代码，网站设计人员可通过301代码指定资源的新位置
        LengthRequired:	411,	// 服务器无法处理客户端发送的不带Content-Length的请求信息
        PreconditionFailed:	412,	// 客户端请求信息的先决条件错误
        RequestEntityTooLarge:	413,	// 由于请求的实体过大，服务器无法处理，因此拒绝请求。为防止客户端的连续请求，服务器可能会关闭连接。如果只是服务器暂时无法处理，则会包含一个Retry-After的响应信息
        RequestURITooLarge:	414,	// 请求的URI过长（URI通常为网址），服务器无法处理
        UnsupportedMediaType:	415,	// 服务器无法处理请求附带的媒体格式
        RequestedRangeNotSatisfiable:	416,	// 客户端请求的范围无效
        ExpectationFailed:	417,	// 服务器无法满足Expect的请求头信息
        Imateapot: 418, // I'm a teapot
        TooManyConnections: 421, // 从当前客户端所在的IP地址到服务器的连接数超过了服务器许可的最大范围。通常，这里的IP地址指的是从服务器上看到的客户端地址（比如用户的网关或者代理服务器地址）。在这种情况下，连接数的计算可能涉及到不止一个终端用户。
        UnprocessableEntity: 422, // 请求格式正确，但是由于含有语义错误，无法响应。（RFC 4918 WebDAV）
        Locked: 423, // 当前资源被锁定。（RFC 4918 WebDAV）
        FailedDependency: 424, // 由于之前的某个请求发生的错误，导致当前请求失败，例如 PROPPATCH。（RFC 4918 WebDAV）
        UnorderedCollection: 425, // 在WebDav Advanced Collections 草案中定义，但是未出现在《WebDAV 顺序集协议》（RFC 3658）中。
        UpgradeRequired: 426, // 客户端应当切换到TLS/1.0。（RFC 2817）
        RetryWith: 449, // 由微软扩展，代表请求应当在执行完适当的操作后进行重试。
        UnavailableForLegalReasons: 451, // 该请求因法律原因不可用。（RFC 7725）

        // 服务器错误，服务器在处理请求的过程中发生了错误
        InternalServerError:	500,	// 服务器内部错误，无法完成请求
        NotImplemented:	501,	// 服务器不支持请求的功能，无法完成请求
        BadGateway:	502,	// 作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应
        ServiceUnavailable:	503,	// 由于超载或系统维护，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的Retry-After头信息中
        GatewayTimeout:	504,	// 充当网关或代理的服务器，未及时从远端服务器获取请求
        HTTPVersionNotSupported:	505,	// 服务器不支持请求的HTTP协议的版本，无法完成处理
        VariantAlsoNegotiates:	506, // 由《透明内容协商协议》（RFC 2295）扩展，代表服务器存在内部配置错误：被请求的协商变元资源被配置为在透明内容协商中使用自己，因此在一个协商处理中不是一个合适的重点。
        InsufficientStorage:	507, // 服务器无法存储完成请求所必须的内容。这个状况被认为是临时的。WebDAV (RFC 4918)
        BandwidthLimitExceeded: 509, // 服务器达到带宽限制。这不是一个官方的状态码，但是仍被广泛使用。
        NotExtended:	510, // 获取资源所需要的策略并没有被满足。（RFC 2774）

        UnparseableResponseHeaders: 600 // 源站没有返回响应头部，只返回实体内容
      };
    }
    return this[STATUS];
  },
};
