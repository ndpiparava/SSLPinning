//
//  TrustKitInitialiser.m
//  sslpinnig
//
//  Created by Nitin Piparava on 06/03/23.
//
#import <TrustKit/TrustKit.h>
#import "TrustKitInitialiser.h"

@implementation TrustKitInitialiser

  // To export a module named RCTCalendarModule
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(InitialiseTrustKit:(NSArray *)sslPk)
{
  NSDictionary *trustKitConfig =
  @{
    kTSKSwizzleNetworkDelegates: @YES,
    kTSKPinnedDomains : @{
      @"jsonplaceholder.typicode.com" : @{
        kTSKEnforcePinning : @YES,
        kTSKIncludeSubdomains:@YES,
        kTSKPublicKeyHashes : sslPk,
        kTSKPublicKeyAlgorithms : @[kTSKAlgorithmRsa2048],
      },
    }
  };
  [TrustKit initSharedInstanceWithConfiguration:trustKitConfig];
}

@end
