var ionicApp = angular.module("starter",[]);

ionicApp.controller('MainController', ['$scope', function($scope) {
	$scope.btnstring="";
	$scope.commentstring="";
	$scope.flag=true;
	$scope.numPadHideFlag=true;
    $scope.hideRow2Flag=false;
	$scope.hideRow2Flag1=true;
	$scope.hideThirdFlag=false;
	$scope.totalHideFlag=true;
	$scope.finalizeFlag=false;
		$scope.dotFlag=false;
		$scope.fot_duplicate=true;
		$scope.correctionFlag=true;
	var discountType;
	$scope.fot=false;
	$scope.capitalLettersFlag=false;
	$scope.smallLettersFlag=true;
	var total=0;
	var myCart=[];
	var myDiscount=[];
	var itemIdOptions;
	var EC;
	var check=0;
	var checkOne=0;
	$scope.btnpress= function(btnid) 
    {	
		btnstring=$scope.btnstring;//Required if mixing both type of inputs at same time in same box
		btnstring+=btnid;
	   	$scope.btnstring=btnstring;
    }
	$scope.getColor =function()
	{
		if ($scope.hideThirdFlag == "true") 
		return "green";
		else 
		return "white";
	}
	
	$scope.doubleZero=function()
	{
		if(btnstring.length>0)
		{
			btnstring=$scope.btnstring;
			btnstring+="00";
			$scope.btnstring=btnstring;
		}
	}
	$scope.cncpress= function() 
    {
		btnstring=btnstring.substring(0,btnstring.length-1);
		$scope.btnstring=btnstring;
    }
	
	$scope.cancelpress= function() 
    {
		commentstring="";
		$scope.commentstring=commentstring;
    } 
		
	$scope.okpress= function() 
    {
		if($scope.btnstring==="")
		{
		alert("Blank Fields Not Allowed");
		$scope.cancelpress();
		return;
		}
		// If planning to use input box type as text
		if(/^[a-zA-Z]+$/.test($scope.btnstring))
		{
			alert("Alphabets not allowed. Only Numbers");
			$scope.cancelpress();
		}
        $scope.btnstring=btnstring;
	}
	
	$scope.allCupsItems=function()
	{
		$scope.hideRow2Flag1=false;
		$scope.hideRow2Flag=true;
	}
	
	
	var calculateTotal=function()
	{
		total=0;
		for(var i=0;i<myCart.length;i++)
		{ 
			total+=myCart[i].rate;
		}
		return total;
	}
	
	$scope.itemOptions=function(ItemId)
	{
		//checkForMultipleItemSelected();
		for(var i=0;i<myCart.length;i++)
			{
				myCart[i].checked=false;
				$scope.myCart=myCart;
			}
		checkOne++;
		if(checkOne==2)
		{
			$scope.hideThirdFlag=false;
			$scope.hideRow2Flag=false;
			itemIdOptions=null;
			for(var i=0;i<myCart.length;i++)
			{
				if(myCart[i].Id==ItemId)
				{
					myCart[i].checked=false;
					$scope.myCart=myCart;
				}
			}
			checkOne=0;
		}
		else
		{
			$scope.hideRow2Flag1=true;
			$scope.hideRow2Flag=true;
			$scope.hideThirdFlag=true;
			$scope.finalizeFlag=true;
			itemIdOptions=ItemId;
			for(var i=0;i<myCart.length;i++)
			{
				if(myCart[i].Id==ItemId)
				{
					myCart[i].checked=true;
					$scope.myCart=myCart;
				}
			}
		}
	}
	$scope.priceCorrection=function()
	{
		$scope.fot_duplicate=true;
		$scope.fot=true;
		$scope.correctionFlag=false;
		$scope.numPadHideFlag=false;
		$scope.dotFlag=false;
	}
	
	$scope.calculateCorrection=function()
	{
		var correctedValue=parseInt($scope.btnstring);
		for(var i=0;i<myCart.length;i++)
		{
			if(myCart[i].Id==itemIdOptions)
		   {
				myCart[i].rate=correctedValue;
				total=calculateTotal();
		   }
		}
		$scope.myCart=myCart;
		$scope.total=total;
		$scope.numPadHideFlag=true;
		$scope.fot=false;
		$scope.dotFlag=true;
		$scope.btnstring="";
	}
	
	$scope.cancelCorrection=function()
	{
		check=0;
		$scope.numPadHideFlag=true;
		$scope.fot=false;
		$scope.dotFlag=true;
		$scope.btnstring="";
	}
	
	$scope.itemFree=function()
	{
		for(var i=0;i<myCart.length;i++)
		{
			if(myCart[i].Id==itemIdOptions)
		   {
				if(myCart[i].itemFree==false)
				{
				total-=myCart[i].rate;
				myCart[i].rate=0;
				myCart[i].itemFree=true;
				checkOne=0;
				$scope.cancelOption();
				break;
				} 
				else
				{
				total-=(myCart[i].qty*myCart[i].price);
				myCart[i].rate=0;
				checkOne=0;
				$scope.cancelOption();
				break;
				}
		   }
		  
	    }
		$scope.myCart=myCart;
		$scope.total=total;
	}
	
	$scope.itemVoid=function()
	{
		for(var i=0;i<myCart.length;i++)
		{
			if(myCart[i].Id==itemIdOptions)
		   {
				if(myCart[i].discount>0)
				{
					total+=myCart[i].discount;
					
				}
				total-=myCart[i].rate;
				myCart[i].chekced=false;
				var j=0;
					for(var j=0;j<myDiscount.length;j++)
					{
						if(myDiscount[j].name==myCart[i].name)
						{
							for(var k=j;k<myDiscount.length-1;k++)
							{
								myDiscount[k]=myDiscount[k++];
							}
							myDiscount.length=myDiscount.length-1;
						}
					}
				if(i==(myCart.length)-1)
				{
					myCart.length=myCart.length-1;
				}
				else
				{
					for(var j=i;j<myCart.length;j++)
						myCart[j]=myCart[j+1];
						myCart.length=myCart.length-1;
				}
				
				$scope.hideThirdFlag=false;
				$scope.hideRow2Flag=false;
			}
			checkOne=0;
	    }
		$scope.myDiscount=myDiscount;
		$scope.myCart=myCart;
		$scope.total=total;
	}
	$scope.comment=function()
	{
		window.location="keyboardScreen.html";
	}
	$scope.cancelOption=function()
	{
		$scope.hideThirdFlag=false;
		$scope.hideRow2Flag=false;
		for(var i=0;i<myCart.length;i++)
		{
			myCart[i].checked=false;
			$scope.myCart=myCart;
		}
		
	}
	$scope.discount=function(type)
	{
		$scope.fot_duplicate=false;
		$scope.fot=true;
		$scope.correctionFlag=true;
		$scope.numPadHideFlag=false;
		discountType=type;
	}
	
	$scope.calculateDiscount=function()
	{
		var discountVal=parseInt($scope.btnstring);
		if(discountType=='%')
		{
			$scope.discountValue="Percentage";
			for(var i=0;i<myCart.length;i++)
			{
				if(myCart[i].Id==itemIdOptions)
				{
					if(discountVal<100 && discountVal>0)
					{
						discount=((myCart[i].rate*discountVal)/100);
						total-=discount;
						myCart[i].discount=discount;
						var item=new Object();
						item.name=myCart[i].name;
						item.discount=discount;
						myDiscount.push(item);
					}
					else
					alert("Enter Correct Percentage");
				}
			}
		}
		else if(discountType=='$')
		{
			$scope.discountValue="Amount";
			for(var i=0;i<myCart.length;i++)
			{
				if(myCart[i].Id==itemIdOptions)
				{
					if(discountVal<myCart[i].rate && discountVal>0)
					{
						discount=discountVal;
						total-=discountVal;
						myCart[i].discount=discount;
						var item=new Object();
						item.name=myCart[i].name;
						item.discount=discount;
						myDiscount.push(item);
					}
					else
					alert("Enter Correct Discount");
				}
			}
		}
		$scope.fot=false;
		$scope.numPadHideFlag=true;
		$scope.myDiscount=myDiscount;
		$scope.btnstring="";
		$scope.myCart=myCart;
		$scope.total=total;
		
	}
	
	
	$scope.errorCorrection=function()
	{
		for(var i=0;i<myCart.length;i++)
		{
			if(myCart[i].Id==EC)
		   {
				alert("aaa   "+EC);
				total-=myCart[i].price;
				if(i==myCart.length-1)
				{
					if(myCart[i].qty>1)
					{
						myCart[i].qty--;
						myCart[i].rate-=myCart[i].price;
					}
					else
					myCart.length=myCart.length-1;
				}
				else
				{
					if(myCart[i].qty>1)
					{
						myCart[i].qty--;
						myCart[i].rate-=myCart[i].price;
					}
					else
					for(var j=i;j<myCart.length;j++)
					{
						myCart[i]=myCart[i++];
					}
				}
				alert(myCart.length);
		   }
	    }
		$scope.myCart=myCart;
		$scope.total=total;
	}
	$scope.numPad=function()
	{
		check++;
		if(check%2==0)
			$scope.numPadHideFlag=true;
		else
			$scope.numPadHideFlag=false;
	}
	$scope.back=function()
	{
		$scope.hideThirdFlag=false;
		$scope.hideRow2Flag=false;
		$scope.hideRow2Flag1=true;
		checkOne=1;
		$scope.itemOptions(itemIdOptions);
	}
	$scope.cancelDiscount=function()
	{
		$scope.btnstring="";
		$scope.numPadHideFlag=true;
		$scope.fot=false;
	}
	$scope.enterbtnpress=function()
	{
		
		if($scope.fot_duplicate==false)
		{
			if(btnstring.length>0)
			$scope.calculateDiscount();
			$scope.fot=false;
			$scope.fot_duplicate=true;
			$scope.correctionFlag=true;
		}
		else if($scope.correctionFlag==false)
		{
			if(btnstring.length>0)
			{
			$scope.calculateCorrection();
			}
			$scope.fot=false;
			$scope.fot_duplicate=true;
			$scope.correctionFlag=true;
		}
	}
	$scope.cancelNumPad=function()
	{
		check=0;
		$scope.numPadHideFlag=true;
		$scope.fot=false;
		$scope.dotFlag=true;
		$scope.fot_duplicate=true;
		$scope.correctionFlag=true;
	}
	$scope.addItemToCart=function(itemID)
	{
		EC=itemID;
		var itemExistsFlag=0;
		if(myCart.length>0)
		{
			for(var i=0;i<myCart.length;i++)
			{
				if(myCart[i].Id==itemID)
			   {
					itemExistsFlag=1;
				    myCart[i].qty++;//Item present in cart,so increase its quantity
					myCart[i].rate=myCart[i].qty * myCart[i].price;
					$scope.myCart=myCart;
				    break;
			   }
		    }
		}
		if(itemExistsFlag==0)
		{
			var myItem=new Object();
			if(itemID==1)
			{
				myItem.Id=1;
				myItem.qty=1;
				myItem.name="Slurpee Small";
				myItem.rate=5.20;
				myItem.price=5.20;
			}
			if(itemID==2)
			{
				myItem.Id=2;
				myItem.qty=1;
				myItem.name="Slurpee Medium";
				myItem.rate=10.00;
				myItem.price=10.00;
			}
			if(itemID==3)
			{
				myItem.Id=3;
				myItem.qty=1;
				myItem.name="Slurpee Large";
				myItem.rate=25.00;
				myItem.price=25.00;
			}
			if(itemID==4)
			{
				myItem.Id=4;
				myItem.qty=1;
				myItem.name="Coffee Small";
				myItem.rate=7.20;
				myItem.price=7.20;
			}
			if(itemID==5)
			{
				myItem.Id=5;
				myItem.qty=1;
				myItem.name="Coffee Medium";
				myItem.rate=14.50;
				myItem.price=14.50;
			}
			if(itemID==6)
			{
				myItem.Id=6;
				myItem.qty=1;
				myItem.name="Coffee Large";e
				myItem.rate=30.00;
				myItem.price=30.00;
			}
			myItem.itemFree=false;
			myCart.push(myItem);
		}
		$scope.totalHideFlag=false;
		$scope.total=calculateTotal();
		$scope.myCart=myCart;
	}
	$scope.commentpress= function(id) 
    {	
		commentstring=$scope.commentstring;//Required if mixing both type of inputs at same time in same box
		commentstring+=id;
	   	$scope.commentstring=commentstring;
    }
	$scope.cancelPress=function()
	{
		commentstring="";
		$scope.commentstring=commentstring;
	}
	$scope.commentcncpress= function() 
    {
		commentstring=commentstring.substring(0,commentstring.length-1);
		$scope.commentstring=commentstring;
    }
	
	
	
	$scope.commentcancelpress= function() 
    {
		commentstring="";
		$scope.commentstring=commentstring;
    } 
	
	$scope.enterComment=function()
	{
		for(var i=0;i<myCart.length;i++)
		{
			if(myCart[i].Id==itemIdOptions)
		   {
				myCart[i].comment=$scope.commentstring;
		   }
		}
		$scope.Comment="Comment";
		$scope.commentstring="";
		$scope.myCart=myCart;
	}
	
	$scope.capitalLetters=function()
	{
		$scope.capitalLettersFlag=false;
		$scope.smallLettersFlag=true;
	}
	
	$scope.smallLetters=function()
	{
		$scope.capitalLettersFlag=true;
		$scope.smallLettersFlag=false;
	}
	
}]);