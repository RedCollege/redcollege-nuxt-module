/**
 * Tipos para Server-Sent Events de OpenAI Streaming
 * Estos tipos cubren todos los eventos que pueden llegar via SSE
 */

// Evento base de SSE
export interface SSEBaseEvent {
    type: string
    data: any
}

// Eventos específicos del streaming de OpenAI

export interface SSEConnectionEstablishedEvent extends SSEBaseEvent {
    type: 'connection_established'
    data: {
        channelId: string
        timestamp: string
    }
}

export interface SSEStreamStartEvent extends SSEBaseEvent {
    type: 'stream_start'
    data: {
        projectId: string
        templateRoute: string
        timestamp: string
    }
}

export interface SSEContentChunkEvent extends SSEBaseEvent {
    type: 'content_chunk'
    data: {
        content: string
        totalLength: number
    }
}

export interface SSEStreamInfoEvent extends SSEBaseEvent {
    type: 'stream_info'
    data: {
        responseId: string
        usage?: OpenAIUsage
    }
}

export interface SSEStreamEventEvent extends SSEBaseEvent {
    type: 'stream_event'
    data: {
        eventType: string
        timestamp: string
    }
}

export interface SSEStreamCompleteEvent extends SSEBaseEvent {
    type: 'stream_complete'
    data: {
        totalContent: string
        usage?: OpenAIUsage
        responseId?: string
        duration: number
        success: true
    }
}

export interface SSEStreamErrorEvent extends SSEBaseEvent {
    type: 'stream_error'
    data: {
        error: string
        message?: string
        timestamp: string
    }
}

// Tipo unión de todos los eventos posibles
export type SSEEvent =
    | SSEConnectionEstablishedEvent
    | SSEStreamStartEvent
    | SSEContentChunkEvent
    | SSEStreamInfoEvent
    | SSEStreamEventEvent
    | SSEStreamCompleteEvent
    | SSEStreamErrorEvent

// Tipos auxiliares
export interface OpenAIUsage {
    input_tokens: number
    output_tokens: number
    total_tokens: number
}

// Response del endpoint executePromptSSE
export interface ExecutePromptSSEResponse {
    success: boolean
    channelId: string
    message: string
    error?: string
}
