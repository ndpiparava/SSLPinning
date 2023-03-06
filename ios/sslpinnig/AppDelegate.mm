#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <TrustKit/TrustKit.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"sslpinnig";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  //[self initTrustKit];
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

//- (void)initTrustKit {
//  NSDictionary *trustKitConfig =
//  @{
//    kTSKSwizzleNetworkDelegates: @YES,
//    kTSKPinnedDomains : @{
//      @"jsonplaceholder.typicode.com" : @{
//        kTSKEnforcePinning : @YES,
//        kTSKIncludeSubdomains:@YES,
//        kTSKPublicKeyHashes : @[
//          @"F5yEJFlAhYki30l8i+NwYAdXTKE1+x/n9J41HHorqys=",
//          @"AXxEJFlAhYki30l8i+NwYAdXTKE1+x/n9J41HHorqys=",
//          
//        ],
//        kTSKPublicKeyAlgorithms : @[kTSKAlgorithmRsa2048],
//      },
//    }
//  };
//  [TrustKit initSharedInstanceWithConfiguration:trustKitConfig];
//}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
  return true;
}

@end
