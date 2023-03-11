import Head from "next/head"
import { HeadTypes } from "./types"

const SEO = (props: HeadTypes) => (
  <Head>
    <title>{props.title}</title>
    <meta charSet="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <meta name="description" content={props.description} />
    <meta name="keywords" content={props.keywords} />
    <meta name="robots" content="index, follow" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="language" content={props.language} />
    <meta name="revisit-after" content={props.visit} />
    <meta name="author" content="@resyntech" />
  </Head>
)

export default SEO
