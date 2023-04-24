import _ from 'lodash';

export const getDelivery = (details) => {
  const deliveryPolicy = getPolicy(details, 'Dispatch Duration')
  return deliveryPolicy
}

export const getReturnPolicy = (details) => {
  const returnPolicy = getPolicy(details, 'Return')
  return returnPolicy
}

const getPolicy = (details, policyType) => {
  const sellerPolicy = _.get(details, 'supplier_details.seller_policy')
  if(!sellerPolicy) {
    return null
  }
  
  const policy = sellerPolicy.find(p => p.policy_type === policyType)
  return policy && policy.policy
}