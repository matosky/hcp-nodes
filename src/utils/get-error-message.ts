import type { ResponseWithError } from "@/types/network-response"
import { AxiosError } from "axios"

function isErrorWithMessage(error: unknown): error is Error {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  )
}

function toErrorWithMessage(likelyError: unknown): Error {
  if (isErrorWithMessage(likelyError)) return likelyError

  try {
    return new Error(JSON.stringify(likelyError))
  } catch {
    return new Error(String(likelyError))
  }
}

export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message
}

export function getError(error: unknown) {
  return toErrorWithMessage(error)
}

export function getErrorResponse(error: unknown): string | undefined {
  const parseError = getError(error) as AxiosError<ResponseWithError>

  if (parseError.name === "AxiosError") {
    const er = parseError.response

    if (Array.isArray(er?.data?.data)) {
      const erData = er?.data?.data
      if (erData && erData.length > 0) {
        if (typeof erData[0] === "string") {
          return erData[0]
        } else if (typeof erData[0] === "object") {
          return erData[0].field
            ? `${erData[0].field}: ${erData[0].message}`
            : erData[0].message
        }
      }
    } else if (typeof er?.data?.message === "string") {
      return er.data.message
    } else {
      return parseError.message
    }
  }

  return undefined
}
