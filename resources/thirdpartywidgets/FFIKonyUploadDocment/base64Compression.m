//
//  base64Compression.m
//  Base64Compression
//
//  Created by Rajesh on 2/17/14.
//
//

#import "base64Compression.h"

@implementation base64Compression
+ (NSString*) decodeStringFromKony:(NSString*) string {
    //Initialise base64 class
    [Base64 initialize];
    //generate NSData of string received from Kony framework
    NSData* resultData=[Base64 decode:string];
    
    //generate image from NSData
    UIImage *image=[UIImage imageWithData: resultData];
                    //resize the image & re-transfer to NSData
    base64Compression * instance1=[ [base64Compression alloc]init];
    UIImage* resized = [instance1 resizeImage:image width:768  height:1024]; //set your dimensions as per request.

    NSData* pictureData = UIImageJPEGRepresentation(resized, 0.25f); // set compression ratio as per your request.

    //this is final endoced base64 string which have appropriate compressed image

    NSString* resultDataString=string;
    return resultDataString;
    }
    

@end
