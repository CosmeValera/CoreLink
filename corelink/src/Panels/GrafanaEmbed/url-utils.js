export function addQueryParam(options) {
  const url = new URL(options.url)

  if (Array.isArray(options.value)) {
    options.value.forEach((value) =>
      url.searchParams.append(options.name, value),
    )
  } else {
    url.searchParams.append(options.name, options.value)
  }

  return url.toString()
}
