import http from "node:http";

const DEFAULT_PORT = 3000;

let requestCount = 0;
let requestHealthCount = 0;
let requestRequestsCount = 0;
let requestEchoCount = 0;
let requestUppercaseCount = 0;
let requestCalculateCount = 0;
let requestUnknownCount = 0;

export function sendJson(res, statusCode, body) {
    res.writeHead(statusCode, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify(body));
}

export function readJsonBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            if (body.trim() === "") {
                resolve({});
                return;
            }

            try {
                resolve(JSON.parse(body));
            } catch {
                reject(new Error("Invalid JSON"));
            }
        });

        req.on("error", reject);
    });
}

export function handleCalculate(body) {
    if (Object.keys(body).length !== 3) {
        return {
            statusCode: 400,
            response: {
                error: "json must include the three keys: a, b, and operation"
                }
        };
    }
    if (!body.hasOwnProperty("a")) {
        return {
            statusCode: 400,
            response: {
                error: "json property \"a\" not detected"
                }
        };
    }
    if (!body.hasOwnProperty("b")) {
        return {
            statusCode: 400,
            response: {
                error: "json property \"b\" not detected"
                }
        };
    }
    if (!body.hasOwnProperty("operation")) {
        return {
            statusCode: 400,
            response: {
                error: "json property \"operation\" not detected"
                }
        };
    }

    const operation = JSON.stringify(body.operation).toUpperCase()

    const a = body.a
    if (!Number.isFinite(a)) {
        return {
            statusCode: 400,
            response: {
                error: "value \"a\" is not a number"
                }
        };
    }
    const b = body.b
    if (!Number.isFinite(b)) {
        return {
            statusCode: 400,
            response: {
                error: "value \"b\" is not a number"
                }
        };
    }
    let calculated
    if (operation === "\"DIVIDE\""){
        if (b === 0){
            return {
                statusCode: 400,
                response: {
                    error: "Cannot divide by 0"
                    }
            };
        }
        calculated = a / b
    }
    else if (operation === "\"ADD\""){
        calculated = a + b
    }
    else if (operation === "\"SUBTRACT\""){
        calculated = a - b
    }
    else if (operation === "\"MULTIPLY\""){
        calculated = a * b
    }
    else if (operation === "\"MODULO\""){
        if (b === 0){
            return {
                statusCode: 400,
                response: {
                    error: "Cannot divide by 0"
                    }
            };
        }
        calculated = a % b
    }
    else{
        return {
            statusCode: 400,
            response: {
                error: "unknown operation requested"
                }
        };
    }
    return {
        statusCode: 200,
        response: {
            result: calculated
        }
    };
}

export async function requestHandler(req, res) {
    requestCount += 1;

    const method = req.method;
    const url = req.url;

    if (method === "GET" && url === "/health") {
        sendJson(res, 200, { status: "ok" });
        requestHealthCount += 1;
        return;
    }

    if (method === "GET" && url === "/requests") {
        requestRequestsCount += 1;
        sendJson(res, 200, { totalRequests:requestCount, HealthRequests:requestHealthCount, EchoRequests:requestEchoCount,
            UppercaseRequests:requestUppercaseCount, CalculateRequests:requestCalculateCount, 
            UnknownRequests:requestUnknownCount, RequestsRequests:requestRequestsCount
           });
        return;
    }

    if (method === "POST" && url === "/echo") {
        try {
            const body = await readJsonBody(req);

            sendJson(res, 200, body);
        } catch {
            sendJson(res, 400, { error: "Invalid JSON" });
        }
        requestEchoCount += 1;
        return;
    }

    if (method === "POST" && url === "/uppercase") {
        try {
            const body = await readJsonBody(req);
            let uppercase = JSON.stringify(body.message).toUpperCase()
            uppercase = uppercase.replace(/^"(.*)"$/, '$1');

            sendJson(res, 200, { message: uppercase});
        } catch {
            sendJson(res, 400, { error: "Invalid JSON" });
        }
        requestUppercaseCount += 1;
        return;
    }

    if (method === "POST" && url === "/calculate") {
        try {
            const body = await readJsonBody(req);
            const result = handleCalculate(body);

            sendJson(res, result.statusCode, result.response);
        } catch {
            sendJson(res, 400, { error: "Invalid JSON" });
        }
        requestCalculateCount += 1;
        return;
    }
    requestUnknownCount += 1;
    sendJson(res, 404, { error: "Not found" });
}

export function createServer() {
    return http.createServer(requestHandler);
}

export function resetState() {
    requestCount = 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const port = process.env.PORT || DEFAULT_PORT;
    const server = createServer();

    server.listen(port, () => {
        console.log(`HTTP JSON server listening on port ${port}`);
    });
}