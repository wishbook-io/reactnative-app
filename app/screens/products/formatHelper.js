import _ from 'lodash';

export const formatCatalogDetails = (data, price) => {
  const brand = _.get(data, 'brand_name') || ''
    const category = data.category_name
    const title = data.catalog_title
    const id = data.id
    const sizes = data.available_sizes && data.available_sizes.replace(/,/g, ', ')
    const eavData = data.eavdata || {}
    const stitch = eavData.stitching_type
    const fabric = _.get(eavData, 'fabric.length')
    const work = _.get(eavData, 'work.length')
    const top = eavData.top || eavData.Top
    const bottom = eavData.bottom || eavData.Bottom
    const dupatta = eavData.dupatta || eavData.Dupatta
    const other = eavData.other
    const singleAvailable = data.full_catalog_orders_only === false
    const isSingle = data.product_type === 'single'
    const designCount = _.get(data, 'products.length')
    const lengths = []

    let copied = '⚡'
    if(isSingle) {
      copied += `Single Piece ${category} from `
    }
    if(brand) {
      copied += `${brand} `
    }
    copied += `${title} `
    if(!isSingle) {
      copied += `${category} `
    }
    copied +=`Collection⚡\n\n`
    if(isSingle) {
      copied += `*Product Id*: ${id}\n\n`
    } else {
      copied += `*No of Designs*: ${designCount}\n*Catalog Id*: ${id}\n\n`
    }

    if(price) {
      copied += `*Price*: ${price}/Pc.\n`
    }
    if(sizes) {
      copied += `*Available Sizes*: ${sizes}\n\n`
    }
    if(stitch) {
      copied += `*Stitching Details*: ${stitch}\n\n`
    }
    if(fabric) {
      const text = eavData.fabric.join(', ')
      copied += `*Fabric*: ${text}\n`
    }
    if(work) {
      const text = eavData.work.join(', ')
      copied += `*Work*: ${text}\n`
    }
    if(top !== undefined) {
      lengths.push(`Top: ${top}`)
    }
    if(bottom !== undefined) {
      lengths.push(`Bottom: ${bottom}`)
    }
    if(dupatta !== undefined) {
      lengths.push(`Dupatta: ${dupatta}`)
    }
    if(lengths.length) {
      copied += `*Lengths*: ${lengths.join(', ')}\n`
    }
    if(other) {
      copied += `*Other Details*: ${other}\n`
    }
    copied += '\n\n'
    copied += '*COD Available*\n'
    if(singleAvailable) {
      copied += '*Single Piece Available*\n'
    }
    return copied;
}