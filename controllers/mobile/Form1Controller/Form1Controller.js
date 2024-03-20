define({ 

  //Type your controller code here 
  onNavigate: function(){
    //this.initCNContactPickerDelegate();
    this.view.btnDoc.onClick = this.onFileSelected;
    this.initUIDocumentPickerDelegate();
    //this.view.btn2.onClick = this.openContact;
    this.initUIImagePickerControllerDelegate();
    this.view.btn3.onClick = this.openGallery;
  },
  initUIDocumentPickerDelegate:function(){

    this.ViewController = objc.newClass('ViewController'+Math.random(), 'UIViewController', ['UIDocumentPickerDelegate'], {
      documentPickerDidPickDocumentAtURL: function(controller, url) {
        //alert("url Selected...."+ url);
        kony.runOnMainThread(function() {

          kony.print("documentPickerDidPickDocumentAtURL: "+url);
          var NSString = objc.import("NSString");
          //var format = NSString.stringWithFormat("Hello %@ !! Enjoy your day"  ,["World"]);
          var NSError = objc.import("NSError");
          var NSData = objc.import("NSData");
          var NSDataReadingMappedIfSafe = objc.import("NSDataReadingMappedIfSafe");
          //NSError *error = nil;
          //var error = 
          //NSData *data = [NSData dataWithContentsOfURL:url options:NSDataReadingMappedIfSafe error:&error];
          var data = NSData.dataWithContentsOfURLOptionsError(url, NSDataReadingMappedIfSafe, {}).base64EncodedStringWithOptions(0);
          //NSData.alloc().i

          kony.print("Base64 Encoded Document: "+JSON.stringify(data));
          //         if (error) {
          //             NSLog(@"Error reading document: %@", error);
          //             return;
          //         }
          //NSString *base64String = [data base64EncodedStringWithOptions:0];

          // Now you have the Base64 encoded string of the document

          //NSLog(@"Base64 Encoded Document: %@", data);
          // Get the filename from the document URL
          //NSString *filename = [url lastPathComponent];

          var NSURL = objc.import("NSURL");
          //var url = url;// an erroneous URL to generate an error
          //var error = {}; // a place holder object for storing the error info.
          // var content = NSString.stringWithContentsOfURLEncodingError(url, NSASCIIStringEncoding, error);


          //NSString.stringWithContentsOfURLUsedEncodingError(url, enc, error)
          var filename = url.lastPathComponent;
          kony.print("Selected Document Filename: "+filename);
          // Now you have the filename of the selected document
          // NSLog(@"Selected Document Filename: %@", filename);
        }, []);        
        //3577194
      },
      documentPickerWasCancelled: function(controller) {
      }
    });

  },
  onFileSelected: function(filePath) {
    // Handle the selected file path here

    try{
      //       var NSString = objc.import("NSString");
      //     var format = NSString.stringWithFormat("Hello %@ !! Enjoy your day"  ,["World"]);


      //     var BatteryStatus={};
      //     var UIDevice = objc.import("UIDevice");
      //     var currentDevice = UIDevice.currentDevice();
      //     currentDevice.batteryMonitoringEnabled = true;
      //     var batteryLevel = currentDevice.batteryLevel;
      //     // BatteryStatus.BateryLevel=BateryLevel;
      //     var state =currentDevice.batteryState;
      //     batteryLevel = (batteryLevel*100).toFixed(1);
      //     batteryLevel=Math.round(batteryLevel);
      //     BatteryStatus.BateryLevel=batteryLevel;
      //     if(state==1){
      //       BatteryStatus.isCharging=false;
      //     }  else{
      //       BatteryStatus.isCharging=true;
      //     }
      //alert(BatteryStatus);
      var UIDocumentPickerViewController = objc.import("UIDocumentPickerViewController");

      var myObj = this.ViewController.alloc().jsinit();
      var UIDocumentPickerModeImport = objc.import("UIDocumentPickerModeImport");
      //let documentPicker = UIDocumentPickerViewController(documentTypes: ["public.content"], in: .import)
      var  documentPicker = UIDocumentPickerViewController.alloc().initWithDocumentTypesInMode(["public.content"], UIDocumentPickerModeImport)
      //initWithDocumentTypesInMode(["public.content"], UIDocumentPickerModeImport)

      documentPicker.delegate = myObj;
      //To display the new UI 
      //viewController
      kony.runOnMainThread(function() {
        var UIApplication = objc.import("UIApplication")
        UIApplication.sharedApplication().keyWindow.rootViewController.presentViewControllerAnimatedCompletion(documentPicker, true, false);
      }, []); 


      // alert("Selected Document: " + format);
    }catch(err){
      alert("onFileSelected"+err);
    }

  },
  initCNContactPickerDelegate:function(){

    this.ViewController = objc.newClass('ViewController'+Math.random(), 'UIViewController', ['CNContactPickerDelegate'], {
      contactPickerDidSelectContact: function(controller, contact) {
        alert("Contact Selected...."+ contact.givenName);
        kony.runOnMainThread(function() {
          if (contact.phoneNumbers.length > 0) {
            var name = null;
            if(contact.givenName !== null && contact.familyName !== null && contact.givenName !== undefined && contact.familyName !== undefined){
              name = contact.givenName +" "+ contact.familyName;
            }else if(contact.givenName !== null && contact.givenName !== undefined){
              name = contact.givenName;
            }else if(contact.familyName !== null && contact.familyName !== undefined){
              name = contact.familyName;
            }

            //               if (contact.phoneNumbers.length > 1){

            //                 var uniquePhoneSet = contact.phoneNumbers.filter((value1,index,self)=> self.map(x => x.value.stringValue).indexOf(value1.value.stringValue) == index);
            //                  if(uniquePhoneSet.length ==1){
            //                    self.validateMobNum(uniquePhoneSet[0].value.stringValue,name);
            //                  }else{
            //                    var data= self.formatContactData(uniquePhoneSet,name);
            //                   if(self.onMultipleContactsAvailable!==undefined)
            //                      self.onMultipleContactsAvailable.call(self,data);
            //                  }

            //               }else{
            //                 self.validateMobNum(contact.phoneNumbers[0].value.stringValue,name);
            //               }

          }else{
            // self.validateMobNum(null);
          }
        }, []);                               
      },
      contactPickerDidCancel: function(controller) {
      }
    });

  },
  openContact:function(){
    var CNContactPickerViewController = objc.import("CNContactPickerViewController");


    var myObj = this.ViewController.alloc().jsinit();

    var cVC = CNContactPickerViewController.alloc().jsinit();

    cVC.delegate = myObj;
    var UIApplication = objc.import("UIApplication");
    UIApplication.sharedApplication().keyWindow.rootViewController.presentViewControllerAnimatedCompletion(cVC, true, false); 

    //       mWalletiOS.mibOpenContacts(function(cpData){
    //          // alert(cpData);
    //         var phNumbers = cpData.phoneNumbers;
    //         var name = cpData.name;
    //         if(phNumbers.length > 0 ){
    //           if(phNumbers.length === 1){
    //             self.validateMobNum(phNumbers[0].numData,name);
    //           }else if(phNumbers.length > 1){
    //             var data= self.formatContactData(phNumbers,name);
    //             if(self.onMultipleContactsAvailable!==undefined){
    //                 self.onMultipleContactsAvailable.call(self,data);
    //             }
    //           }
    //         }else{
    //           self.validateMobNum(null);
    //         }
    //       });
  },
  initUIImagePickerControllerDelegate:function(){

    this.ViewController = objc.newClass('ViewController'+Math.random(), 'UIViewController', ['UIImagePickerControllerDelegate'], {

      imagePickerControllerDidFinishPickingMediaWithInfo: function(controller, info) {
         kony.print("info Document: "+JSON.stringify(info));
        kony.runOnMainThread(function() {
          var UIImage = objc.import("UIImage");
          //var UIImageJPEGRepresentation = objc.import("UIImageJPEGRepresentation");

          //var UIImagePickerControllerOriginalImage = objc.import("UIImagePickerControllerOriginalImage");
          
          /**********************
          IOS - Objective C code for reference
          //UIImage *image = [info objectForKey:UIImagePickerControllerOriginalImage];
          //NSData *imgData = UIImageJPEGRepresentation(image, 1.0);
          //NSString *base64String = [imgData base64EncodedStringWithOptions:0];
          //NSLog(@"Image Data: %@", base64String);

          //NSURL *imagePath = [info objectForKey:@"UIImagePickerControllerReferenceURL"];
          //PHFetchResult *result = [PHAsset fetchAssetsWithALAssetURLs:@[imagePath] options:nil];
          //NSString *filename = [[result firstObject] filename];
          //NSLog(@"[filename ] %@", filename );
          End of objective c code*/
          
          /*********************************
          ######Java Script code need proper syntax#############
          //Uncomment this code and ask kony for proper syntax
          var image = info.objectForKey(UIImagePickerControllerOriginalImage);
          var NSData = objc.import("NSData");

          var imgData = UIImageJPEGRepresentation(image,1.0);
          var base64String = imgData.base64EncodedStringWithOptions(0);

          kony.print("Base64 Encoded Document: "+JSON.stringify(base64String));
          var imagePath = info.objectForKey("UIImagePickerControllerReferenceURL");
          var PHFetchResult = objc.import("PHFetchResult");
          var PHAsset = objc.import("PHAsset");
          var result = PHAsset.fetchAssetsWithALAssetURLsOptions([imagePath], undefined);
          var filename = result.lastObject;
          kony.print("filename: "+filename);
          */
          
          
          
          //Dismiss gallery code added
          var UIApplication = objc.import("UIApplication");
          UIApplication.sharedApplication().keyWindow.rootViewController.dismissViewControllerAnimatedCompletion(true, null);
        }, []);                               
      },
      imagePickerControllerDidCancel: function(controller) {
        //To dismiss the new UI viewController
        var UIApplication = objc.import("UIApplication");
        UIApplication.sharedApplication().keyWindow.rootViewController.dismissViewControllerAnimatedCompletion(true, null);
      }
    });

  },
  openGallery:function(){
    var UIImagePickerController = objc.import("UIImagePickerController");


    var myObj = this.ViewController.alloc().jsinit();

    var cVC = UIImagePickerController.alloc().jsinit();

    cVC.delegate = myObj;
    kony.runOnMainThread(function() {
      var UIApplication = objc.import("UIApplication");
      UIApplication.sharedApplication().keyWindow.rootViewController.presentViewControllerAnimatedCompletion(cVC, true, false); 
    },[]);
  },


});