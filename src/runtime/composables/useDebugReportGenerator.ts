// composables/useDebugReportGenerator.ts
import { useAuthStore, useNotification } from '#imports';
import { useRoute, useRuntimeConfig } from 'nuxt/app';
import { storeToRefs } from 'pinia';
import type { LocationQuery, RouteParams } from 'vue-router';

// Almacenamiento global para logs y errores (fuera del composable para persistir entre llamadas)
const globalConsoleLogs: Array<{ type: string; message: string; timestamp: string }> = [];
const globalCapturedErrors: Array<{ message: string; stack?: string; timestamp: string }> = [];
let isInterceptorActive = false;
let originalConsole: any = null;

export const useDebugReportGenerator = () => {
    const route = useRoute();
    const { user } = storeToRefs(useAuthStore());
    const runtimeConfig = useRuntimeConfig();

    // Inicializar captura global si aún no está activa
    if (!isInterceptorActive && process.client) {
        initGlobalDebugCapture();
    }

    /**
     * Inicializa los interceptores globales de logs y errores
     */
    function initGlobalDebugCapture() {
        if (isInterceptorActive || !process.client) return;

        // Guardar referencia a console original
        originalConsole = {
            log: console.log,
            warn: console.warn,
            error: console.error,
            info: console.info
        };

        // Función para procesar argumentos de consola
        const processConsoleArgs = (args: any[]): string => {
            return args.map(arg => {
                if (arg === null) return 'null';
                if (arg === undefined) return 'undefined';
                if (typeof arg === 'object') {
                    try {
                        return JSON.stringify(arg);
                    } catch (e) {
                        return '[Objeto complejo]';
                    }
                }
                return String(arg);
            }).join(' ');
        };

        // Reemplazar métodos de consola
        console.log = function (...args: any[]) {
            const message = processConsoleArgs(args);
            globalConsoleLogs.push({
                type: 'log',
                message,
                timestamp: new Date().toISOString()
            });

            // Mantener solo los últimos 200 logs
            if (globalConsoleLogs.length > 200) {
                globalConsoleLogs.shift();
            }

            originalConsole.log.apply(console, args);
        };

        console.warn = function (...args: any[]) {
            const message = processConsoleArgs(args);
            globalConsoleLogs.push({
                type: 'warn',
                message,
                timestamp: new Date().toISOString()
            });

            // Mantener solo los últimos 200 logs
            if (globalConsoleLogs.length > 200) {
                globalConsoleLogs.shift();
            }

            originalConsole.warn.apply(console, args);
        };

        console.error = function (...args: any[]) {
            const message = processConsoleArgs(args);
            globalConsoleLogs.push({
                type: 'error',
                message,
                timestamp: new Date().toISOString()
            });

            // Mantener solo los últimos 200 logs
            if (globalConsoleLogs.length > 200) {
                globalConsoleLogs.shift();
            }

            originalConsole.error.apply(console, args);
        };

        console.info = function (...args: any[]) {
            const message = processConsoleArgs(args);
            globalConsoleLogs.push({
                type: 'info',
                message,
                timestamp: new Date().toISOString()
            });

            // Mantener solo los últimos 200 logs
            if (globalConsoleLogs.length > 200) {
                globalConsoleLogs.shift();
            }

            originalConsole.info.apply(console, args);
        };

        // Capturar errores globales
        window.addEventListener('error', function (event) {
            globalCapturedErrors.push({
                message: event.message,
                stack: event.error?.stack,
                timestamp: new Date().toISOString()
            });

            // Mantener solo los últimos 50 errores
            if (globalCapturedErrors.length > 50) {
                globalCapturedErrors.shift();
            }
        });

        window.addEventListener('unhandledrejection', function (event) {
            globalCapturedErrors.push({
                message: `Promesa rechazada: ${event.reason}`,
                stack: event.reason?.stack,
                timestamp: new Date().toISOString()
            });

            // Mantener solo los últimos 50 errores
            if (globalCapturedErrors.length > 50) {
                globalCapturedErrors.shift();
            }
        });

        isInterceptorActive = true;
        console.info('[Sistema] Captura de logs activa');
    }

    /**
     * Extrae el ID del establecimiento de la URL actual
     */
    const extractEstablishmentId = (): string | null => {
        const pathParts = route.path.split('/');
        if (pathParts.length > 1 && pathParts[1]) {
            return pathParts[1];
        }
        return null;
    };

    /**
     * Obtiene todos los parámetros de ruta
     */
    const getRouteParams = (): RouteParams => {
        return route.params;
    };

    /**
     * Obtiene todos los parámetros de consulta (query)
     */
    const getQueryParams = (): LocationQuery => {
        return route.query;
    };

    /**
     * Obtiene información del navegador
     */
    const getBrowserInfo = () => {
        if (!process.client) return { userAgent: '', browserInfo: {}, deviceInfo: {} };

        return {
            userAgent: navigator.userAgent,
            browserInfo: {
                viewport: `${window.innerWidth}x${window.innerHeight}`,
                screenSize: `${window.screen.width}x${window.screen.height}`,
                language: navigator.language,
                cookiesEnabled: navigator.cookieEnabled,
                doNotTrack: navigator.doNotTrack
            },
            deviceInfo: {
                platform: navigator.platform,
                isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                isOnline: navigator.onLine,
                connectionType: (navigator as any).connection ? (navigator as any).connection.effectiveType : undefined,
                memory: (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory} GB` : undefined
            }
        };
    };

    /**
     * Obtiene información de rendimiento
     */
    const getPerformanceInfo = () => {
        if (!process.client || !window.performance) {
            return undefined;
        }

        const performanceInfo: any = {};

        // Tiempo de carga
        const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigationTiming) {
            performanceInfo.loadTime = navigationTiming.loadEventEnd - navigationTiming.startTime;
        }

        // Recursos lentos
        const resourceEntries = performance.getEntriesByType('resource');
        if (resourceEntries.length > 0) {
            performanceInfo.resources = resourceEntries
                .filter(entry => entry.duration > 300) // Solo recursos lentos
                .slice(0, 10) // Limitar a 10 recursos
                .map(entry => ({
                    name: entry.name.split('/').pop() || 'unknown',
                    duration: Math.round(entry.duration)
                }));
        }

        // Información de memoria si está disponible
        if ((performance as any).memory) {
            const memoryInfo = (performance as any).memory;
            performanceInfo.memory = {
                jsHeapSizeLimit: memoryInfo.jsHeapSizeLimit,
                totalJSHeapSize: memoryInfo.totalJSHeapSize,
                usedJSHeapSize: memoryInfo.usedJSHeapSize
            };
        }

        return performanceInfo;
    };

    /**
     * Formatea un valor para el markdown, quitando comillas a números
     */
    const formatValue = (value: any): string => {
        if (value === null || value === undefined) {
            return 'null';
        }

        // Si es un array, formatear cada elemento
        if (Array.isArray(value)) {
            const formattedItems = value.map(item => {
                // Si es número, convertir a número
                if (typeof item === 'string' && !isNaN(Number(item))) {
                    return Number(item);
                }
                return item;
            });
            return JSON.stringify(formattedItems);
        }

        // Si es un string que parece número, convertir a número
        if (typeof value === 'string' && !isNaN(Number(value))) {
            return Number(value).toString();
        }

        // Para otros casos, usar JSON.stringify
        return JSON.stringify(value);
    };

    /**
     * Toma un screenshot del estado actual de la página
     */
    const takeScreenshot = async (): Promise<string> => {
        if (!process.client) return '';

        try {
            // Usando html2canvas para capturar la página
            const html2canvas = await import('html2canvas');
            const canvas = await html2canvas.default(document.body);
            return canvas.toDataURL('image/png');
        } catch (error) {
            console.error('Error al tomar screenshot:', error);
            return '';
        }
    };

    /**
     * Genera el contenido markdown completo
     */
    const generateDebugReport = async (includeScreenshot = false): Promise<string> => {
        const currentDateTime = new Date().toISOString();
        const currentUrl = process.client ? window.location.href : route.fullPath;
        const establishmentId = extractEstablishmentId();
        const currentUser = user.value?.correo || 'Usuario desconocido';

        // Obtener información del navegador y rendimiento solo en cliente
        const { userAgent, browserInfo, deviceInfo } = process.client ? getBrowserInfo() : { userAgent: '', browserInfo: {}, deviceInfo: {} };
        const performanceInfo = process.client ? getPerformanceInfo() : undefined;

        // Construir el markdown
        let markdown = `# Informe de Debugging\n\n`;

        // Información básica
        markdown += `## Información Básica\n\n`;
        markdown += `**URL:** ${currentUrl}\n\n`;
        markdown += `**ID de Establecimiento:** ${establishmentId || 'No disponible'}\n\n`;
        markdown += `**Correo Usuario:** ${currentUser}\n\n`;
        markdown += `**Fecha y Hora:** ${new Date(currentDateTime).toLocaleString()}\n\n`;
        markdown += `**Versión de la App:** ${runtimeConfig.public?.appVersion || 'Desconocida'}\n\n`;

        // Información del Navegador (solo en cliente)
        if (process.client) {
            markdown += `## Información del Navegador\n\n`;
            markdown += `**User Agent:** ${userAgent}\n\n`;
            markdown += `**Viewport:** ${browserInfo.viewport}\n\n`;
            markdown += `**Tamaño de pantalla:** ${browserInfo.screenSize}\n\n`;
            markdown += `**Idioma:** ${browserInfo.language}\n\n`;
            markdown += `**Plataforma:** ${deviceInfo.platform}\n\n`;
            markdown += `**Dispositivo móvil:** ${deviceInfo.isMobile ? 'Sí' : 'No'}\n\n`;
            markdown += `**Online:** ${deviceInfo.isOnline ? 'Sí' : 'No'}\n\n`;

            if (deviceInfo.connectionType) {
                markdown += `**Tipo de conexión:** ${deviceInfo.connectionType}\n\n`;
            }
        }

        // Rendimiento (solo en cliente)
        if (process.client && performanceInfo) {
            markdown += `## Información de Rendimiento\n\n`;

            if (performanceInfo.loadTime) {
                markdown += `**Tiempo de carga:** ${performanceInfo.loadTime.toFixed(0)}ms\n\n`;
            }

            if (performanceInfo.memory) {
                // Verificar que todas las propiedades existan antes de usarlas
                const jsHeapSizeLimitMB = performanceInfo.memory.jsHeapSizeLimit
                    ? (performanceInfo.memory.jsHeapSizeLimit / (1024 * 1024)).toFixed(2)
                    : 'N/A';
                const totalJSHeapSizeMB = performanceInfo.memory.totalJSHeapSize
                    ? (performanceInfo.memory.totalJSHeapSize / (1024 * 1024)).toFixed(2)
                    : 'N/A';
                const usedJSHeapSizeMB = performanceInfo.memory.usedJSHeapSize
                    ? (performanceInfo.memory.usedJSHeapSize / (1024 * 1024)).toFixed(2)
                    : 'N/A';

                markdown += `**Memoria JS:**\n`;
                markdown += `- Límite: ${jsHeapSizeLimitMB} MB\n`;
                markdown += `- Total: ${totalJSHeapSizeMB} MB\n`;
                markdown += `- Usada: ${usedJSHeapSizeMB} MB\n\n`;
            }

            if (performanceInfo.resources && performanceInfo.resources.length > 0) {
                markdown += `**Recursos lentos:**\n`;
                performanceInfo.resources.forEach((resource: any) => {
                    markdown += `- ${resource.name}: ${resource.duration}ms\n`;
                });
                markdown += `\n`;
            }
        }

        // Parámetros de ruta
        const routeParams = getRouteParams();
        if (Object.keys(routeParams).length > 0) {
            markdown += `## Parámetros de Ruta\n\n`;
            markdown += `- `;
            const routeParamEntries = Object.entries(routeParams);
            routeParamEntries.forEach(([key, value], index) => {
                markdown += `**${key}**: ${formatValue(value)}`;
                if (index < routeParamEntries.length - 1) {
                    markdown += `\n- `;
                }
            });
            markdown += `\n\n`;
        }

        // Parámetros de consulta
        const queryParams = getQueryParams();
        if (Object.keys(queryParams).length > 0) {
            markdown += `## Parámetros de Consulta\n\n`;
            markdown += `- `;
            const queryParamEntries = Object.entries(queryParams);
            queryParamEntries.forEach(([key, value], index) => {
                markdown += `**${key}**: ${formatValue(value)}`;
                if (index < queryParamEntries.length - 1) {
                    markdown += `\n- `;
                }
            });
            markdown += `\n\n`;
        }

        // Errores capturados
        if (process.client && globalCapturedErrors.length > 0) {
            markdown += `## Errores Detectados\n\n`;
            globalCapturedErrors.forEach((error, index) => {
                markdown += `### Error ${index + 1}\n\n`;
                markdown += `**Mensaje:** ${error.message}\n\n`;
                markdown += `**Hora:** ${new Date(error.timestamp).toLocaleString()}\n\n`;

                if (error.stack) {
                    markdown += `**Stack:**\n\`\`\`\n${error.stack}\n\`\`\`\n\n`;
                }
            });
        }

        // Logs de consola
        if (process.client && globalConsoleLogs.length > 0) {
            markdown += `## Logs de Consola (últimos ${Math.min(globalConsoleLogs.length, 50)})\n\n`;
            markdown += `\`\`\`\n`;

            // Mostrar solo los últimos 50 logs para no hacer el informe demasiado largo
            const recentLogs = globalConsoleLogs.slice(-50);
            recentLogs.forEach(log => {
                const time = new Date(log.timestamp).toLocaleTimeString();
                markdown += `[${time}] [${log.type.toUpperCase()}] ${log.message}\n`;
            });
            markdown += `\`\`\`\n\n`;
        } else if (process.client) {
            markdown += `## Logs de Consola\n\n`;
            markdown += `No se han capturado logs de consola.\n\n`;
        }

        // Añadir screenshot si está disponible y se solicita
        if (process.client && includeScreenshot) {
            const screenshot = await takeScreenshot();
            if (screenshot) {
                markdown += `## Screenshot\n\n`;
                markdown += `![Screenshot de la página](${screenshot})\n\n`;
            }
        }

        // Sección para describir el problema
        markdown += `## Descripción del Problema\n\n`;
        markdown += `[Por favor, describa aquí el problema en detalle]\n\n`;

        // Pasos para reproducir
        /*markdown += `## Pasos para Reproducir\n\n`;
        markdown += `1. \n2. \n3. \n\n`;

        // Comportamiento esperado vs actual
        markdown += `## Comportamiento Esperado\n\n`;
        markdown += `[Describa lo que debería suceder]\n\n`;

        markdown += `## Comportamiento Actual\n\n`;
        markdown += `[Describa lo que está sucediendo actualmente]\n\n`;*/

        return markdown;
    };

    /**
     * Copia el informe al portapapeles
     */
    const copyDebugReportToClipboard = async (includeScreenshot = false): Promise<void> => {
        if (!process.client) {
            console.warn('La función de copiar al portapapeles solo está disponible en el cliente');
            return;
        }

        try {
            const markdown = await generateDebugReport(includeScreenshot);
            await navigator.clipboard.writeText(markdown);

            // Notificar al usuario
            useNotification().toast({
                title: 'Informe copiado',
                description: 'Informe de debugging copiado al portapapeles',
            })

        } catch (error) {
            console.error('Error al copiar informe:', error);
            alert('Error al generar el informe de debugging');
        }
    };

    return {
        generateDebugReport,
        copyDebugReportToClipboard
    };
};